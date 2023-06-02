import "../styles/Booklist.css";
import React, { useState, useEffect } from "react";
// import bookImg from "../assets/tomorrow.png"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleCheck,faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';


function UserBook({ id, title, author, completed }) {
  const [bookData, setBookData] = useState([]);

  const toggleImage = async (bookId, currentStatus) => {
    const updatedStatus = currentStatus === "available" ? "unavailable" : "available";
    const token = window.localStorage.getItem("access_token");

    axios
      .get(
        `http://localhost:8000/bookList/me`,
        { status: updatedStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setBookData((prevBookData) =>
          prevBookData.map((book) =>
            book.id === bookId ? { ...book, status: updatedStatus } : book
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const token = window.localStorage.getItem("access_token");
    axios
      .get("http://localhost:8000/bookList/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const book = response.data;
        setBookData(book);
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  return (
    <div>
      {bookData.map(book => (
        <div className="bookList" key={book.bookID}>
          <div className="bookList__body">
            <div>
              <img src={book.image} alt={book.title} className="bookimg"/>
            </div>
            <div class="Contents">
              <h2>{book.title}</h2>
              <p>{book.borrow_date}</p>
              <p>{book.due_date}</p>
            </div>
          </div>
          <div className="right">
            <p>{book.status}</p>
            <div className="availableimg">
              <FontAwesomeIcon
                icon = {book.status === "available" ? faCircleCheck : faCircleXmark}
                color = {book.status === "available" ? "#002B5B" : "#A03131"}
                size = "5x"
              />
            </div>
            <button className="button-17" onClick={() => toggleImage(book.bookID, book.status)}>
              Cancel
            </button>
          </div>
        </div>
      ))}
  </div>
  );
}

export default UserBook;
