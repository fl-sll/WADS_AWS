import React from "react";
import Navbar from "./navbar";
import { Link } from "react-router-dom";
import "../styles/adminPage.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

function CheckOrder(){
    return(
        <div>
            <Navbar page="/adminPage"></Navbar>
            <div className='searchBar'>
                <p>Search student</p>
                <input type='text' placeholder='Search' id='searchInput'></input>
                <button className='searchBtn'>
                    <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
                </button>
            </div>
            <div>
                
            </div>
        </div>
    )
}

export default CheckOrder