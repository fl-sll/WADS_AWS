import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import "../styles/adminPage.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import Adminbook from "./AdminUserPage";
import axios from "axios";

function SearchBooks(){
    const [user, setUser] = useState("all");

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return(
        <div>
            <Navbar page="/dashboard" admin="False"></Navbar>
            <form className='searchBar' onSubmit={handleSubmit}>
                <input type='text' placeholder='Search username' id='searchInput'></input>
                <button type="submit" className='searchBtn'>
                    <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                </button>
            </form>
            <div>
                <Adminbook user={user}></Adminbook>
            </div>
        </div>
    )
}

export default SearchBooks