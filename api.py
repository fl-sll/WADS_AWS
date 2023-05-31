from datetime import datetime, timedelta
import io
from typing import Union
from fastapi import Depends, FastAPI, HTTPException, status, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
import base64
from PIL import Image

conn = mysql.connector.connect(
    host="35.238.148.78",
    user="staniswinata",
    password="staniswinata07",
    database="AWSLibrary",
    auth_plugin="mysql_native_password",
)

global cursor
cursor = conn.cursor()

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def decode_blob(blob: str):
    # image = base64.b16decode(blob)
    print("here")
    decoded_image = base64.b64decode(blob)
    print("decoded", decoded_image)
    print("there")
    return decoded_image
    

@app.get("/displayBook")
def display_book():
    cursor.execute("SELECT * FROM Books")
    books = cursor.fetchall()
    # print(books)
    # print(books[0])
    # print(books[0][3])
    image = decode_blob(books[0][3])
    # decoded_image = Image.open(io.BytesIO(base64.b64decode(blob)))
    # print(image)
    # print(type(image))
    img = Image.frombytes("RGB",(85,85) , image)
    img.save("test.png")
    # print(image)
    return 0