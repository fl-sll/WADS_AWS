import "../styles/BookDB.css";
import React, { useState, useEffect } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleCheck,faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import { BACKEND_LINK } from "./Const";
import { useNavigate } from "react-router-dom";


function AdminBooklist({ word }) {
  const [bookData, setBookData] = useState([]);
  const [refreshData, setRefreshData] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = (bookId) => {
    setBookData((prevBookData) =>
      prevBookData.map((book) =>
        book.id === bookId ? { ...book, isEditing: true } : book
      )
    );
  };

  const handleDeleteClick = (bookId) => {
    const token = window.localStorage.getItem("access_token");

    axios
      .delete(`${BACKEND_LINK}/deleteBook/${bookId}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setBookData((prevBookData) =>
          prevBookData.filter((book) => book.id !== bookId)
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setRefreshData((prevValue) => !prevValue);
      });
  };

  const handleSaveClick = (bookId) => {
    const bookToUpdate = bookData.find((book) => book.id === bookId);
    const token = window.localStorage.getItem("access_token");

    const data = {
      author: bookToUpdate.author,
      title: bookToUpdate.title,
      image: bookToUpdate.image,
    }

    axios
      .put(
        `${BACKEND_LINK}/editBook/${bookId}`, data, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setBookData((prevBookData) =>
          prevBookData.map((book) =>
            book.id === bookId ? { ...book, isEditing: false } : book
          )
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setRefreshData((prevValue) => !prevValue);
      });
  };

  useEffect(() => {
    axios
      .get(BACKEND_LINK + "/books", {
        headers: {
          "accept" : "application/json"
        },
        withCredentials: false,
        params: {
          search : word !== "" ? word : undefined,
        },
      })
      .then((response) => {
        const book = response.data.map((book) => ({
          ...book,
          isEditing: false
        }));
        setBookData(book);
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          navigate("/error")
        } else {
          console.log(error)
        }
      })

  }, [refreshData, word, navigate]);

  return (
    <div>
      {bookData.map(book => (
        <div className="bookList" key={book.id}>
          <div className="bookList__body">
            <div>
              <img src={`${book.image}`} alt={book.title} className="bookimg"/>
            </div>
            <div className="Contents">
              {book.isEditing ? (
                <>
                  <h2>
                    <input
                      type="title"
                      value={book.title}
                      onChange={(e) =>
                        setBookData((prevBookData) =>
                          prevBookData.map((b) =>
                            b.id === book.id ? { ...b, title: e.target.value } : b
                          ))}/>
                  </h2>
                  <p>
                    <input
                      type="text"
                      value={book.author}
                      onChange={(e) =>
                        setBookData((prevBookData) =>
                          prevBookData.map((b) =>
                            b.id === book.id ? { ...b, author: e.target.value } : b
                          ))}/>
                  </p>
                  <p>
                    <input
                      type="text"
                      value={book.image}
                      onChange={(e) =>
                        setBookData((prevBookData) =>
                          prevBookData.map((b) =>
                            b.id === book.id ? { ...b, image: e.target.value } : b
                          ))}/>
                  </p>
                </>
              ) : (
                <>
                  <h2>{book.title}</h2>
                  <p>{book.author}</p>
                </>
              )}
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
            <div>
              {book.isEditing ? (
                  <button className="databaseBtn" id="editBtn" onClick={() => handleSaveClick(book.id)}>
                    Save
                  </button>
                ) : (
                  <button className="databaseBtn" id="editBtn" onClick={() => handleEditClick(book.id)}>
                    Edit
                  </button>
                )}
              <button className="databaseBtn" id="delBtn" onClick={() => handleDeleteClick(book.id)}>
                Delete
              </button>
            </div>
            
          </div>
        </div>
      ))}
  </div>
  );
}

export default AdminBooklist;
