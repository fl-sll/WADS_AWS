import React, { useState } from "react";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import "../styles/adminPage.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import Adminbook from "./AdminUserPage";
import axios from "axios";

function CheckOrder(){
    const [user, setUser] = useState("null");
    // setUser("annemarry@mail.com")
    console.log(user)

    const handleSubmit = (e) => {
        e.preventDefault();
        // const input = e.target.user
        // console.log("input: ", input)

        axios
        .get(`http://127.0.0.1:8000/borrowedBooks/${user}`)

        .then((response) => {
            console.log(response)
            console.log(response.data[0]["uid"])
        })
    }

    return(
        <div>
            <Navbar page="/adminPage"></Navbar>
            <form className='adminSearchBar' onSubmit={handleSubmit}>
                <input type='text' placeholder='Search username' id='adminSearchInput' value={user} onChange={(e) => setUser(e.target.value)}></input>
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

export default CheckOrder