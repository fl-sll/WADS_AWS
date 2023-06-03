import "../styles/UserBook.css";
import React, { useState, useEffect } from "react";
// import bookImg from "../assets/tomorrow.png"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import Availabilitydropdown from "./adminDrop"


function Adminbook({ user, id, title, author, completed }) {
  const [bookData, setBookData] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  const toggleImage = async (bookId, currentStatus) => {
    const token = window.localStorage.getItem("access_token");
    // console.log(bookId);

    axios
      .put(
        `http://localhost:8000/updateBook/${bookId}`,
        { status: currentStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setBookData((prevBookData) =>
        prevBookData.map((book) =>
          book.bookId === bookId ? { ...book, status: currentStatus } : book
        )
      );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setRefreshData(prevValue => !prevValue);
      });
  };

  useEffect(() => {
    const token = window.localStorage.getItem("access_token");
    axios
      .get("http://localhost:8000/borrowedBooks", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const book = response.data;
        setBookData(book);
        // console.log(book)
      })
      .catch((error) => {
        console.log(error);
      });

  }, [refreshData]);

  return (
    <div>
      {bookData.map(book => (
        <div className="bookList" key={book.id}>
          <div className="bookList__body">
            <div>
              <img src={book.image} alt={book.title} className="bookimg"/>
            </div>
            <div class="UserContents">
              <h2>{book.title}</h2>
              <p>Borrowed: {book.borrow_date}</p>
              <p>Due Date: {book.due_date}</p>
              <p className="name" title={book.uid}>
                Customer: {book.fullname}
              </p>
            </div>
          </div>
          <div className="right">
            <p>{book.status}</p>
            <div className="availableimg">
              <FontAwesomeIcon
                icon = {faCircleCheck}
                color = {"#628B48"}
                size = "5x"
              />
            </div>
            <Availabilitydropdown bookId = {book.bookID} toggleImage = {toggleImage} />
          </div>
        </div>
      ))}
  </div>
  );
}

export default Adminbook;
