import React from 'react'
import logo from "../assets/logo.png"
import profile from "../assets/profile.png"
import "../styles/navbar.css"

function Navbar(){
    return(
        <div>
            <div className='top'>
                <img src={logo} alt="" className='logo'></img>
                <img src={profile} alt='' className='profile'></img>
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

