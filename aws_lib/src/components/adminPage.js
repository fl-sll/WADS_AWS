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
            <Link to="/addBook"><button>Add Book</button></Link>
            <button>check user book</button>
            <Footer></Footer>
        </div>
    )
}

export default AdminPage