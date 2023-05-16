import Modal from "./Modal";
import "../styles/Books.css";

import React from 'react';

function Books({ onClose, open, title, author }) {
  return (
    <Modal modalLable="Books" onClose={onClose} open={open}>
      <div className="books">
        <h2>{title}</h2>
        <p>{author}</p>
      </div>
    </Modal>
  );
}

export default Books;
