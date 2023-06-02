import React from "react";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import "../styles/adminPage.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import UserBook from "./UserBook";

function CheckOrder(){
    return(
        <div>
            <Navbar page="/adminPage"></Navbar>
            <form className='adminSearchBar'>
                <input type='text' placeholder='Search username' id='adminSearchInput'></input>
                <button type="submit" className='searchBtn'>
                    <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                </button>
            </form>
            <div>
                <UserBook></UserBook>
            </div>
        </div>
    )
}

export default CheckOrder
