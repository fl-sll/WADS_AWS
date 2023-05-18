import "../styles/Booklist.css";
import React, { useState } from "react";
import bookImg from "../assets/tomorrow.png"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleCheck,faCircleXmark } from '@fortawesome/free-solid-svg-icons'

function BookList({ id, title, author, completed }) {
  const [checked, setChecked] = useState(completed);
  const [icon, setIcon] = useState(checked ? faCircleXmark : faCircleCheck);
  const [availabilityText, setAvailabilityText] = useState(checked ? "Unavailable" : "Available");
  const [iconColor, setIconcolor] = useState(checked ? "#A03131" : "#002B5B");

  const toggleImage = () => {
    setChecked(!checked);
    setIcon(!checked ? faCircleXmark : faCircleCheck);
    setAvailabilityText(!checked ? "Unavailable" : "Available");
    setIconcolor(!checked ? "#A03131" : "#002B5B");
  };
  // const [open, setOpen] = useState({ edit: false, view: false });

  // /* function to update document in firestore */
  // const handleCheckedChange = async () => {
  //   const todoDocRef = doc(db, "tasks", id)
  //   try{
  //     await updateDoc(todoDocRef, {
  //       completed: checked
  //     })
  //   }catch(err){
  //     alert(err)
  //   }
  // }

  return (
    <div className={`bookList ${checked && "bookList--borderColor"}`}>
      <div className="bookList__body">

        <div>
          <img src = {bookImg} alt= "" className="bookimg"></img>
        </div>

        <div>
          <h2>Pride and Prejudice</h2>
          <p>Jane Austen</p>
        </div>

      </div>

      <div class="right">

        <p>{availabilityText}</p>
        <div class="availableimg">
          <FontAwesomeIcon icon={icon} color={iconColor} size="5x"/>
        </div>

        <button class = "button-17" onClick={toggleImage} >
          Borrow
        </button>

      </div>
    </div>
  );
}

export default BookList;
