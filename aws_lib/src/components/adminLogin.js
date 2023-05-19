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
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                <img src={logo} alt="" className="logo"></img>
                <FontAwesomeIcon icon={faLock}></FontAwesomeIcon>
                <input type="text" className="login_textBox" placeholder="Userman"></input>
                <input type="password" className="login_textBox" placeholder=""></input>
                <button className="login_btn">Login</button>

                {/* <Link to="/dashboard">Dashboard</Link> */}
            </div>
            <div>
                <Link to="/">Login As Student</Link>
            </div>
        </div>
    )
}

export default Admin;