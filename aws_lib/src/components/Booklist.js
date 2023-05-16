import "../styles/Booklist.css";
import React, { useState } from "react";
import bookImg from "../assets/tomorrow.png"
import available from "../assets/available.png"
// import Books from "./Books";
// import {db} from "../firebase"
// import {doc, updateDoc} from "firebase/firestore"

function BookList({ id, title, author, completed }) {
  const [checked, setChecked] = useState(completed);
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
        
        {/* <div className="bookList__buttons">
          <button onClick={() => setOpen({ ...open, view: true })}>View</button>
        </div> */}
      </div>
      <div class="right">
        <p>Available</p>
        <img src = {available} alt=""></img>
        <button class = "button-17" onClick={() => setChecked(!checked)} >
          Borrow
        </button>
        {/* <input
          id={`checkbox-${id}`}
          className="checkbox-custom"
          name="checkbox"
          checked={checked}
          type="checkbox"
          // onChange={handleCheckedChange}
        />
        <label
          htmlFor={`checkbox-${id}`}
          className="checkbox-custom-label"
          onClick={() => setChecked(!checked)}
        ></label> */}
      </div>

      {/* {open.view && (
        <Todo
          onClose={handleClose}
          title={title}
          description={description}
          open={open.view}
        />
      )}
      */}
    </div>
  );
}

export default BookList;
