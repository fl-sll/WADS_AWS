import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import "../styles/adminPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Adminbook from "./AdminUserPage";

function CheckOrder() {
  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useState("all");

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(searchValue);
  };

  return (
    <div>
      <Navbar page="/adminPage" />
      <form className="adminSearchBar" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search username"
          id="adminSearchInput"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button type="submit" className="searchBtn">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
      <div>
        <Adminbook user={user} />
      </div>
    </div>
  );
}

export default CheckOrder;