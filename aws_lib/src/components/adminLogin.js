import React, { useState } from "react";
import "../styles/login.css"
import {Link, useNavigate} from "react-router-dom";
import logo from "../assets/adminLogo.png"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faLock} from '@fortawesome/free-solid-svg-icons'
import axios from "axios"
import { BACKEND_LINK } from "./Const";


function Admin(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        const data ={
          username: email,
          password : password
        }
    
        axios
            .post(BACKEND_LINK + "/token", data,  {
                headers:{
                    "accept" : "application/json",
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then((response) => {
                window.localStorage.setItem("access_token", response.data.access_token)
                console.log(response.data.access_token)
                navigate("/adminPage")
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    setError("Invalid email or password. Please try again.");
                    setShowError(true);
                } 
                else {
                    setError("An error occurred. Please try again.");
                    setShowError(true);
                }
            })
    }

    return(
        <div className="login"> 
        <form onSubmit={handleSubmit} className="loginContainer">
            <img src={logo} alt="" className="admlogo"></img>
            
            <div className="formContainer">
                <FontAwesomeIcon icon={faUser} color="black" className="symbol"></FontAwesomeIcon>
                <input type="text" className="login_textBox" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Admin Email"></input>
            </div>
            <div className="formContainer">
                <FontAwesomeIcon icon={faLock} color="black" className="symbol"></FontAwesomeIcon>
                <input type="password" className="login_textBox" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
            </div>
            <button type="submit" className="login_btn">
                Login
            </button>
            <div className={`errorContainer ${showError ? 'show' : ''}`}>
                {error && <p className="error">{error}</p>}
            </div>
        </form>
            <Link to="/" className="adminBtnText" style={{ textDecoration: 'none' }}>
                <button className="adminBtn">Login As Student</button>
            </Link>
        </div>
    )
}

export default Admin;