import "../styles/UserBook.css";
import React, { useState, useEffect } from "react";
// import bookImg from "../assets/tomorrow.png"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleCheck,faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import Availabilitydropdown from "./adminDrop"


function Adminbook({ id, title, author, completed }) {
  const [bookData, setBookData] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  const toggleImage = async (bookId, currentStatus) => {
    const updatedStatus = currentStatus === "available" ? "unavailable" : "available";
    const token = window.localStorage.getItem("access_token");
    console.log(bookId);

    axios
      .put(
        `http://localhost:8000/updateBook/${bookId}`,
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
      .get("http://localhost:8000/books", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const book = response.data;
        setBookData(book);
        console.log();
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
              <p>Due Date: {book.id}</p>
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
            <Availabilitydropdown bookId = {book.id} toggleImage = {toggleImage} />
          </div>
        </div>
      ))}
  </div>
  );
}

export default Adminbook;
