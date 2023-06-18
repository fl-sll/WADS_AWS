import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import "../styles/adminPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
// import Adminbook from "./AdminUserPage";
import AdminBooklist from "./AdminBooklist";

function BookDatabase() {
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(searchValue);
  };

  return (
      <div>
      <Navbar page="/adminPage" admin="True"></Navbar>
            <form onSubmit={handleSubmit} className='searchBar'>
                <p>Search from collections</p>
                <input type='text' placeholder='Search book title' id='searchInput' value={searchValue} onChange={(e) => setSearchValue(e.target.value)}></input>
                <button type='submit' className='searchBtn'>
                    <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                </button>
            </form>
            <AdminBooklist word={search}></AdminBooklist>
        </div>
  );
}

export default BookDatabase;