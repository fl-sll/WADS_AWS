import "../styles/UserBook.css";
import React, { useState, useEffect } from "react";
// import bookImg from "../assets/tomorrow.png"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faReceipt, faBoxArchive } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { BACKEND_LINK } from "./Const";


function UserBook() {
  const [bookData, setBookData] = useState([]);
  const [refreshData, setRefreshData] = useState(false);

  const toggleImage = async (bookId) => {
    const token = window.localStorage.getItem("access_token");

    axios
      .put(
        `${BACKEND_LINK}/cancelBook/${bookId}`, 
        { bookId },{
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
      .then((response) => {
        console.log(response)
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
      .get(BACKEND_LINK + "/bookList/me", {
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

  }, [refreshData]);

  return (
    <div>
      {bookData.map(book => (
        <div className="bookList" key={book.bookID}>
          <div className="bookList__body">
            <div>
              <img src={book.image} alt={book.title} className="bookimg"/>
            </div>
            <div className="UserContents">
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
