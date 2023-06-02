import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { Link } from "react-router-dom";
import "../styles/adminPage.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserCheck, faBook} from '@fortawesome/free-solid-svg-icons'

function AdminPage(){
    return(
        <div>
            <Navbar page="/adminPage"></Navbar>
            <div className="adminContainer">
                <h1 className="adminName">Welcome to Admin Page</h1>
                <div className="buttonContainer">
                    <Link style={{ textDecoration: 'none' }} to="/addBook">
                        <div className="adminPageBtn">
                            <div className='textContainer'>
                                <h2>Add Book</h2>
                                <p>Enter book details and add to database</p>
                            </div>
                            <FontAwesomeIcon icon={faBook} size='4x'/>
                            {/* <FontAwesomeIcon className='logoBtn' icon={faNewspaper} size='6x'></FontAwesomeIcon> */}
                        </div>
                    </Link >
                    <Link style={{ textDecoration: 'none' }} to="/checkOrder">
                        <div className="adminPageBtn">
                            <div className='textContainer'>
                                <h2>Check Student Order</h2>
                                <p>Check order and resolve transactions</p>
                            </div>
                            <FontAwesomeIcon icon={faUserCheck} size='4x'/>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AdminPage