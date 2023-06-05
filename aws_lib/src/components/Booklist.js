import "../styles/Booklist.css";
import React, { useState, useEffect } from "react";
// import bookImg from "../assets/tomorrow.png"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleCheck,faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { BACKEND_LINK } from "./Const";


function BookList({ word }) {
  const [bookData, setBookData] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  const toggleImage = async (bookId, currentStatus) => {
    const updatedStatus = currentStatus === "available" ? "unavailable" : "available";
    const token = window.localStorage.getItem("access_token");

    axios
      .put(
        `${BACKEND_LINK}/books/${bookId}`,
        { status: updatedStatus },
        {
          headers: {
            Accept: "application/json",
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
    .get('https://aws-wads-o7f3eoioba-an.a.run.app/availableBooks?search=1', {
      headers:{
        'Accept': 'application/json'
      }
    })
      // .get(BACKEND_LINK + "/availableBooks/", {
        // headers: {
          // Authorization: `Bearer ${token}`
        // },
        // withCredentials: false,
        // params: {
        //   search : word !== "" ? word : undefined,
        // },
  // })
      .then((response) => {
        const book = response.data;
        console.log(book)
        setBookData(book);
      })
      .catch((error) => {
        console.log(error);
      })

  }, [refreshData, word]);

  return (
    <div>
      {bookData.map(book => (
        <div className="bookList" key={book.id}>
          <div className="bookList__body">
            <div>
              <img src={`${book.image}`} alt={book.title} className="bookimg"/>
            </div>
            <div className="Contents">
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
