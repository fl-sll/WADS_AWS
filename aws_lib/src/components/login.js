import React from "react";
import "../styles/login.css"
import {Link} from "react-router-dom";
import logo from "../assets/logo.png"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faLock} from '@fortawesome/free-solid-svg-icons'


function Login(){
    return(
        <div className="login"> 
            <div className="loginContainer">
                <img src={logo} alt="" className="logo"></img>
                <div className="formContainer">
                    <FontAwesomeIcon icon={faUser} color="black" className="symbol"></FontAwesomeIcon>
                    <input type="text" className="login_textBox" placeholder="Username or Email"></input>
                </div>
                <div className="formContainer">
                    <FontAwesomeIcon icon={faLock} color="black" className="symbol"></FontAwesomeIcon>
                    <input type="password" className="login_textBox" placeholder="Password"></input>
                </div>
                <button className="login_btn">
                    <Link to="/bookpage">Login</Link>
                </button>
            </div>
            <button className="adminBtn">
                <Link to="/adminLogin">Login As Admin</Link>
            </button>
        </div>
    )
}

export default Login;