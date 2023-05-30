from datetime import datetime, timedelta
from typing import Union

from fastapi import Depends, FastAPI, HTTPException, status, UploadFile, File
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from typing_extensions import Annotated
from fastapi.middleware.cors import CORSMiddleware
import base64
from PIL import Image
import requests
import urllib

import mysql.connector

conn = mysql.connector.connect(
    host="35.238.148.78",
    user="staniswinata",
    password="staniswinata07",
    database="AWSLibrary",
    auth_plugin="mysql_native_password",
)

global cursor
cursor = conn.cursor()

SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Union[str, None] = None

class User(BaseModel):
    username: str
    full_name: Union[str, None] = None
    email: Union[str, None] = None
    password:  Union[str, None] = None
    disabled: Union[bool, None] = None

class UserInDB(User):
    hashed_password: str

class Book(BaseModel):
    id: int
    title: str
    author: str
    image: str

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()


origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(username: str):
    cursor.execute("select * from User")
    db = cursor.fetchall()
    # print(db)
    # print(username)

    for i in range(len(db)):
        if username == db[i][2]:
                # user_dict = db[username]
                # return UserInDB(**user_dict)
            return db[i]
    return False

def get_books():
    cursor.execute("SELECT * FROM Books")
    books = cursor.fetchall()
    book_details = []
    for book in books:
        book_id, title, author, image = book
        book_details.append({
            "id": book_id,
            "title": title,
            "author": author,
            "image": image
        })
    return book_details

def insert_book_details(book_id: int, title: str, author: str, image_data: str):
    # base64_image = base64.b64encode(image_data).decode("utf-8")

    cursor.execute(
        "INSERT INTO Books VALUES (%s, %s, %s, %s)",
        (book_id, title, author, image_data)
    )
    conn.commit()


def authenticate_user(username: str, password: str):
    cursor.execute("select * from User")
    user = cursor.fetchall()
    # print(len(user))
    for i in range(len(user)):
        # print(i)
        # print(username)
        # print(user[i][2])
        if username == user[i][2] and verify_password(password, user[i][3]):
            # return {"status": "ok"})
            return username
    return False

def get_user_full_name(username: str):
    cursor.execute("SELECT fullname FROM User WHERE username = %s", (username,))
    result = cursor.fetchall()
    if result:
        return result[0]
    else:
        return None

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt



async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = get_user(username=token_data.username)
    if user is None:
        raise credentials_exception
    # print("user :", user)
    return user


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)]
):
    if current_user[0][4] == 1:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

@app.get("/dummy")
def check():
    cursor.execute("select * from User")
    anya = cursor.fetchall()
    # print(anya)
    return {"data":"data"}

class Test(BaseModel):
    username: str

@app.post("/login")
def login(item: Test):
    cursor.execute("select * from User")
    anya = cursor.fetchall()

    if item.username in anya[0]:
        return {"status": "ok"}
    else:
        return {"status": "not ok"}

@app.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me/")
async def read_users_me(
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    return current_user[1]


@app.get("/users/me/items/")
async def read_own_items(
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    return [{"item_id": "Foo", "owner": current_user.username}]

@app.get("/books")
def get_books_handler():
    return get_books()


@app.post("/addBook")
async def add_book_to_database(id: int, title: str, author: str, file: UploadFile):
    # response = requests.get(imageLink)

    # with open(imageLink, "wb") as f:
    #     f.write(response.content)
    with Image.open("./aws_lib/src/assets/" + file.filename) as f:
        encode_image = base64.b64encode(f.tobytes())
        f.write(file.file.read())

    insert_book_details(id, title, author, encode_image)
    
    
    return "submitted"