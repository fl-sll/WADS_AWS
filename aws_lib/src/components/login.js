import React, { useState } from "react";
import "../styles/login.css"
import {Link, useNavigate} from "react-router-dom";
import logo from "../assets/logo.png"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faLock} from '@fortawesome/free-solid-svg-icons'
import axios from "axios"
import { BACKEND_LINK } from "./Const";


function Login(){
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
                navigate("/dashboard")
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
                <img src={logo} alt="" className="logo"></img>
                {/* <p className="loginDesc">User Login Page</p> */}
                <div className="formContainer">
                    <FontAwesomeIcon icon={faUser} color="black" className="symbol"></FontAwesomeIcon>
                    <input type="text" className="login_textBox" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"></input>
                </div>
                <div className="formContainer">
                    <FontAwesomeIcon icon={faLock} color="black" className="symbol"></FontAwesomeIcon>
                    <input type="password" className="login_textBox" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"></input>
                </div>
                <button type="submit" className="login_btn">
                    {/* <Link to="/bookpage" style={{ textDecoration: 'none' , color:"black"}}>Login</Link> */}
                    Login
                </button>
                <div className={`errorContainer ${showError ? 'show' : ''}`}>
                    {error && <p className="error">{error}</p>}
                </div>
            </form>
                <Link to="/adminLogin" className="adminBtnText" style={{ textDecoration: 'none' }}>
                    <button className="adminBtn">Login As Admin</button>
                </Link>
        </div>
    )
}

export default Login;