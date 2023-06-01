import React, { useState } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { Link } from "react-router-dom";
import "../styles/adminPage.css"

function AdminPage(){
    // const name = "admin"
    const [name, setName] = useState("");
    return(
        <div>
            <Navbar></Navbar>
            <div className="adminContainer">
                <h1 className="adminName">Welcome {name}</h1>
                <div className="buttonContainer">
                    <Link to="/addBook">
                        <div className="adminPageBtn">
                            <div className='textContainer'>
                                <h2>Add Book</h2>
                                <p>Enter book details and add to database</p>
                            </div>
                            {/* <FontAwesomeIcon className='logoBtn' icon={faNewspaper} size='6x'></FontAwesomeIcon> */}
                        </div>
                    </Link>
                    <div className="adminPageBtn">
                        <div className='textContainer'>
                            <h2>Check Student Order</h2>
                            <p>Check order and resolve transactions</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer></Footer>
        </div>
    )
}

export default AdminPage