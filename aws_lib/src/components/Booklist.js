import "../styles/Booklist.css";
import React, { useState, useEffect } from "react";
// import bookImg from "../assets/tomorrow.png"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleCheck,faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';


function BookList({ id, title, author, completed }) {
  const [bookData, setBookData] = useState([]);
  const [checked, setChecked] = useState(completed);
  const [icon, setIcon] = useState(checked ? faCircleXmark : faCircleCheck);
  const [availabilityText, setAvailabilityText] = useState(checked ? "Unavailable" : "Available");
  const [iconColor, setIconcolor] = useState(checked ? "#A03131" : "#002B5B");

  const toggleImage = async () => {
    const updatedChecked = !checked;
    setChecked(updatedChecked);
    setIcon(updatedChecked ? faCircleXmark : faCircleCheck);
    setAvailabilityText(updatedChecked ? 'Unavailable' : 'Available');
    setIconcolor(updatedChecked ? '#A03131' : '#002B5B');

    console.log(bookData)
  };

  useEffect(() => {
    const token = window.localStorage.getItem("access_token");
    axios
      .get("http://localhost:8000/books/", {
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
        <div className="bookList" key={book.id}>
          <div className="bookList__body">
            <div>
              <img src={`data:image/jpeg;base64,${book.image}`} alt={book.title} className="bookimg"/>
            </div>
            <div>
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
            <button className="button-17" onClick={() => toggleImage}>
              Borrow
            </button>
          </div>
        </div>
      ))}
  </div>
  );
}

export default BookList;
