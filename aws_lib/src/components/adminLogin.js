import React from "react";
import "../styles/login.css"
import {Link} from "react-router-dom";
import logo from "../assets/logo.png"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faLock} from '@fortawesome/free-solid-svg-icons'


function Admin(){
    return(
        <div className="login"> 
            <div className="loginContainer">
                <img src={logo} alt="" className="logo"></img>
                <div className="formContainer">
                    <FontAwesomeIcon icon={faUser} color="black" className="symbol"></FontAwesomeIcon>
                    <input type="text" className="login_textBox" placeholder="Admin Code"></input>
                </div>
                <div className="formContainer">
                    <FontAwesomeIcon icon={faLock} color="black" className="symbol"></FontAwesomeIcon>
                    <input type="password" className="login_textBox" placeholder="Password"></input>
                </div>
                <button className="login_btn">
                    <Link style={{textDecoration:"none", color:"white"}} to="/bookpage">Login</Link>
                </button>
            </div>
            {/* <button className="adminBtn"> */}
                <Link to="/">
                    <button className="adminBtn">Login As Student</button></Link>
            {/* </button> */}
        </div>
    )
}

export default Admin;