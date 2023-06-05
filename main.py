from datetime import date, timedelta, datetime
from typing import Union, Optional
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from typing_extensions import Annotated
from fastapi.middleware.cors import CORSMiddleware
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
    is_admin: bool

class User(BaseModel):
    username: str
    full_name: Union[str, None] = None
    email: Union[str, None] = None
    password:  Union[str, None] = None
    disabled: Union[bool, None] = None
    is_admin: bool = False

class UserInDB(User):
    hashed_password: str

class Book(BaseModel):
    id: int
    title: str
    author: str
    image: str

class UpdateBookStatusRequest(BaseModel):
    status: str

class Admin(BaseModel):
    adminID: str
    full_name: Union[str, None] = None
    email: Union[str, None] = None
    password:  Union[str, None] = None
    disabled: Union[bool, None] = None
    is_admin: bool = True

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

    for i in range(len(db)):
        if username == db[i][2]:
            db[i] += (0,)
            print(db[i])
            return db[i]
    return False

def get_admin(username: str):
    cursor.execute("select * from Admin")
    db = cursor.fetchall()

    for i in range(len(db)):
        if username == db[i][2]:
            db[i] += (1,)
            return db[i]
    return False


# only return available books from book table
def get_available_books():
    cursor.execute("SELECT * FROM Book WHERE status = 'available'")
    books = cursor.fetchall()
    book_details = []
    for book in books:
        book_id, title, author, image, status = book
        book_details.append({
            "id": book_id,
            "title": title,
            "author": author,
            "image": image,
            "status": status
        })
    return book_details

# get books from book table
def get_books():
    cursor.execute("SELECT * FROM Book")
    books = cursor.fetchall()
    book_details = []
    for book in books:
        book_id, title, author, image, status = book
        book_details.append({ 
            "id": book_id,
            "title": title,
            "author": author,
            "image": image,
            "status": status
        })
    return book_details

def get_books_search(search: str):
    query = "SELECT * FROM Book WHERE title LIKE %s AND status = 'available'"
    word = "%"+search+"%"
    cursor.execute(query, (word, ))
    books = cursor.fetchall()
    book_details = []
    if len(books) > 0:
        for book in books:
            book_id, title, author, image, status = book
            book_details.append({ 
                "id": book_id,
                "title": title,
                "author": author,
                "image": image,
                "status": status
            })
        return book_details
    else:
        book_details.append({ 
                "id": 0,
                "title": "No available books with that word",
                "author": "N/A",
                "image": "https://img.freepik.com/free-vector/blank-book-cover-vector-illustration-gradient-mesh-isolated-object-design-branding_587448-952.jpg?w=2000",
                "status": "unavailable"
            })
        return book_details


# get books from user, based on that one user
def get_books_from_user(user: str):
    cursor.execute("SELECT u.fullname, bo.uid, bo.bookID, b.title, b.image, bo.borrow_date, bo.due_date, bo.status FROM Borrow bo JOIN Book b ON bo.bookID = b.bookID JOIN User u ON bo.uid = u.email WHERE uid = %s", (user,))
    books = cursor.fetchall()
    book_details = []
    for book in books:
        # book_id, title, author, image, status = book
        fullname, uid, bookID, title, image, date, due, status = book
        book_details.append({
            "fullname" : fullname,
            "uid" : uid,
            "bookID" : bookID,
            "title":title,
            "image": image,
            "borrow_date": date,
            "due_date" : due,
            "status": status
        })
    return book_details

# get books from user, based on that one user
def get_borrowed_books():
    cursor.execute("SELECT u.fullname, bo.uid, bo.bookID, b.title, b.image, bo.borrow_date, bo.due_date, bo.status FROM User u JOIN Borrow bo ON bo.uid = u.email JOIN Book b ON bo.bookID = b.bookID WHERE bo.status = 'ordered';")
    books = cursor.fetchall()
    book_details = []
    for book in books:
        # book_id, title, author, image, status = book
        fullname, uid, bookID, title, image, date, due, status = book
        book_details.append({
            "fullname" : fullname,
            "uid" : uid,
            "bookID" : bookID,
            "title":title,
            "image": image,
            "borrow_date": date,
            "due_date" : due,
            "status": status
        })
    return book_details

# for admin, on the add book admin page
def insert_book_details(book_id: int, title: str, author: str, image_data: str):
    cursor.execute(
        "INSERT INTO Book VALUES (%s, %s, %s, %s, %s)",
        (book_id, title, author, image_data, "available")
    )
    conn.commit()

# when clicked, it will change the status on the database
def update_book_status(book_id: int, status: str):
    cursor.execute(
        "UPDATE Book SET status = %s WHERE bookID = %s",
        (status, book_id)
    )
    conn.commit()

def cancel_order_status(book_id: int):
    cursor.execute(
        "DELETE FROM Borrow WHERE bookID = %s",
        (book_id,)
    )
    cursor.execute(
        "UPDATE Book SET status = 'available' WHERE bookID = %s",
        (book_id,)
    )
    conn.commit()

def update_order_status(book_id: int, status: str):
    cursor.execute(
        "UPDATE Book SET status = 'unavailable' WHERE bookID = %s",
        (book_id,)
    )
    cursor.execute(
        "UPDATE Borrow SET status = %s WHERE bookID = %s",
        (status, book_id)
    )
    conn.commit()

# add info to borrow table with user and book details, also with their dates
def add_borrow_list(book_id: int, uid: str):
    today = date.today()
    due = date.today() + timedelta(days=3)
    cursor.execute(
        "INSERT INTO Borrow VALUES (%s, %s, %s, %s, %s)",
        (uid, book_id, today, due, "ordered")
    )
    conn.commit()

def add_borrow_list(book_id: int, uid: str):
    today = date.today()
    due = date.today() + timedelta(days=3)
    cursor.execute(
        "INSERT INTO Borrow VALUES (%s, %s, %s, %s, %s)",
        (uid, book_id, today, due, "ordered")
    )
    conn.commit()

# check the user
# def authenticate_user(username: str, password: str):
#     cursor.execute("select * from User")
#     user = cursor.fetchall()
#     for i in range(len(user)):
#         if username == user[i][2] and verify_password(password, user[i][3]):
#             return username
#     return False

def authenticate_user(username: str, password: str):
    cursor.execute("SELECT * FROM User")
    user = cursor.fetchall()
    for i in range(len(user)):
        if username == user[i][2] and verify_password(password, user[i][3]):
            return username
    cursor.execute("SELECT * FROM Admin")
    admin = cursor.fetchall()
    for i in range(len(admin)):
        if username == admin[i][2] and verify_password(password, admin[i][3]):
            return username
    return False

# return logged in user fullname
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

# async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
#     credentials_exception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username: str = payload.get("sub")
#         if username is None:
#             raise credentials_exception
#         token_data = TokenData(username=username)
#     except JWTError:
#         raise credentials_exception
#     user = get_user(username=token_data.username)
#     if user is None:
#         raise credentials_exception
#     return user

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        is_admin: bool = payload.get("is_admin")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username, is_admin=is_admin)
    except JWTError:
        raise credentials_exception
    
    # Check if the user is a regular user or an admin
    if token_data.is_admin:
        admin = get_admin(username=token_data.username)
        if admin is None:
            raise credentials_exception
        return admin
    else:
        user = get_user(username=token_data.username)
        if user is None:
            raise credentials_exception
        return user

async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)]
):
    if current_user[0][4] == 1:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

async def is_admin_user(current_user: Admin = Depends(get_current_user)):
    return current_user

# @app.post("/token", response_model=Token)
# async def login_for_access_token(
#     form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
# ):
#     user = authenticate_user(form_data.username, form_data.password)
#     if not user:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED,
#             detail="Incorrect username or password",
#             headers={"WWW-Authenticate": "Bearer"},
#         )
#     access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
#     access_token = create_access_token(
#         data={"sub": user}, expires_delta=access_token_expires
#     )
#     return {"access_token": access_token, "token_type": "bearer"}

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
    is_admin = isinstance(user, Admin)
    access_token = create_access_token(
        data={
            "sub": user,
            "is_admin": is_admin
        },
        expires_delta=access_token_expires
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
    return [{"item_id": "Foo", "owner": current_user}]

@app.get("/availableBooks")
async def get_available_books_handler(search: Optional[str] = None):
    if search is None:
        return get_available_books()
    else:
            return get_books_search(search)

@app.get("/books")
async def get_books_handler():
    return get_books()

@app.get("/borrowedBooks")
async def get_borrowed_book_handler(
    current_user: Annotated[Admin, Depends(is_admin_user)],
    user: Optional[str] = None
):
    # print(current_user)
    if not current_user.is_admin and user != current_user.email:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not authorized to access this resource",
        )
    if user is None:
        return get_borrowed_books()
    else:
        return get_books_from_user(user)

def insert_book_details(book_id: int, title: str, author: str, image_data: str):
    cursor.execute(
        "INSERT INTO Book VALUES (%s, %s, %s, %s, %s)",
        (book_id, title, author, image_data, "available")
    )
    conn.commit()

@app.get("/displayBook")
def display_book():
    cursor.execute("SELECT * FROM Book")
    books = cursor.fetchall()
    return books[0][3]

@app.post("/addBook")
async def add_book_to_database(id: int, title: str, author: str, file: str):
    insert_book_details(id, title, author, file)
    return "submitted"

# @app.get("/display")
# async def display_image():
#     cursor.execute("SElECT * FROM Books;")
#     book = cursor.fetchall()
#     return book

@app.put("/books/{book_id}")
async def borrow_book_status_handler(
    book_id: int,
    request_body: UpdateBookStatusRequest,
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    user = current_user[2]
    add_borrow_list(book_id, user)
    update_book_status(book_id, request_body.status)
    return {"message": "Book status updated successfully"}

@app.put("/updateBook/{book_id}")
async def update_book_status_handler(
    book_id: int,
    request_body: UpdateBookStatusRequest,
    current_user: Annotated[Admin, Depends(is_admin_user)]
):
    if request_body.status == "ordered":
        cancel_order_status(book_id)
    elif request_body.status == "collected":
        update_order_status(book_id, request_body.status)
    else:
        return {"error": "Book status mismatch"}
    return {"message": "Book status updated successfully"}

@app.get("/bookList/me/")
async def book_list(
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    user = current_user[2]
    return get_books_from_user(user)

@app.get("/searchBook")
async def search_user(search: Optional[str] = None):
    if search is None:
        return get_books()
    else:
        return get_books_search(search)