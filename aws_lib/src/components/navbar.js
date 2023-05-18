import React from 'react'
import logo from "../assets/logo.png"
import "../styles/navbar.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleUser} from '@fortawesome/free-solid-svg-icons'

function Navbar(){
    return(
        <div>
            <div className='top'>
                <img src={logo} alt="" className='logo'></img>
                <div className='profile'>
                    <FontAwesomeIcon icon={faCircleUser} size='3x'color='#b5b5b5'/> 
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

