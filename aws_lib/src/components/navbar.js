import React from 'react'
import logo from "../assets/logo.png"
import "../styles/navbar.css"
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleUser} from '@fortawesome/free-solid-svg-icons'

function Navbar(){
    return(
        <div>
            <div className='top'>
                <Link to="/dashboard">
                    <img src={logo} alt="" className='logo'></img>
                </Link>
                
                <div className='profile'>
                    <Link to="/">
                        <FontAwesomeIcon icon={faCircleUser} size='3x'color='#b5b5b5'/> 
                    </Link>
                </div>
            </div>
            <div className='bottom'>
                <p className='button'>Facilities</p>
                <p className='button'>Services</p>
                <p className='button'>Contact Us</p>
                <p className='button'>About Us</p>
            </div>
        </div>
    )
}

export default Navbar;

