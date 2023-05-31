import React, { useState } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { Link } from "react-router-dom";

function AdminPage(){
    // const name = "admin"
    const [name, setName] = useState("");
    return(
        <div>
            <Navbar></Navbar>
            <p>Welcome {name}</p>
            <div>
                <Link to="/addBook"><button className="adminPageBtn">Add Book</button></Link>
                <button className="adminPageBtn">check user book</button>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default AdminPage