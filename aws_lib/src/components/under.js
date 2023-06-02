import React from "react";
import "../styles/navbar.css"
import { Link } from "react-router-dom";

function Under(){
    return(
        <div className='bottom'>
        <p className='button'>Facilities</p>
        <p className='button'>Services</p>
        <p className='button'>Contact Us</p>
        <p className='button'>About Us</p>
        <Link to="/profile" style={{ textDecoration: 'none' }}>
            <p className='button'>My Book List</p>
        </Link>
        
        </div>
    )
}

export default Under;