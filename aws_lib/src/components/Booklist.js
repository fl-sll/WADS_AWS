import "../styles/Booklist.css";
import React, { useState, useEffect } from "react";
// import bookImg from "../assets/tomorrow.png"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleCheck,faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';


function BookList({ id, title, author, completed }) {
  const [bookData, setBookData] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  const toggleImage = async (bookId, currentStatus) => {
    const updatedStatus = currentStatus === "available" ? "unavailable" : "available";
    const token = window.localStorage.getItem("access_token");

    axios
      .put(
        `http://localhost:8000/books/${bookId}`,
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
      })
      .finally(() => {
        setRefreshData(prevValue => !prevValue);
      });
  };

  useEffect(() => {
    const token = window.localStorage.getItem("access_token");
    axios
      .get("http://localhost:8000/availableBooks/", {
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
      })

  }, [refreshData]);

  return (
    <div>
      {bookData.map(book => (
        <div className="bookList" key={book.id}>
          <div className="bookList__body">
            <div>
              <img src={`${book.image}`} alt={book.title} className="bookimg"/>
            </div>
            <div class="Contents">
              <h2>{book.title}</h2>
              <p>{book.author}</p>
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
            <button className="button-17" onClick={() => toggleImage(book.id, book.status)}>
              Borrow
            </button>
          </div>
        </div>
      ))}
  </div>
  );
}

export default BookList;
