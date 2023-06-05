import "../styles/UserBook.css";
import React, { useState, useEffect } from "react";
// import bookImg from "../assets/tomorrow.png"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faReceipt, faBoxArchive } from '@fortawesome/free-solid-svg-icons'
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
            <div class="UserContents">
              <h2>{book.title}</h2>
              <p>Borrowed: {book.borrow_date}</p>
              <p>Due Date: {book.due_date}</p>
            </div>
          </div>
          <div className="right">
            <p>{book.status}</p>
            <div className="availableimg">
              <FontAwesomeIcon
                icon = {book.status === "collected" ? faBoxArchive : faReceipt}
                color = {book.status === "collected" ? "#F4F4F2" : "#320E3B"}
                size = "5x"
              />
            </div>
            <button className="button-17" onClick={() => toggleImage(book.bookID, book.status)}>
              Cancel order
            </button>
          </div>
        </div>
      ))}
  </div>
  );
}

export default UserBook;
