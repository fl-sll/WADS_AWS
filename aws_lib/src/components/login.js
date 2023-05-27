import React, { useState } from "react";
import "../styles/login.css"
import {Link, useNavigate} from "react-router-dom";
import logo from "../assets/logo.png"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faLock} from '@fortawesome/free-solid-svg-icons'
import axios from "axios"


function Login(){
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    // const [valid, setValid] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data ={
          username: email,
          password : password
        }
    
        axios
            .post("http://127.0.0.1:8000/token", data,  {
                headers:{
                    "accept" : "application/json",
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
    
            .then((response) => {
                window.localStorage.setItem("access_token", response.data.access_token)
                console.log(response.data.access_token)
            //   setValid(1)
                navigate("/dashboard")
            })
            .catch(function(error) {
              console.log(error);
            })
    }

    return(
        <div className="login"> 
            <form onSubmit={handleSubmit} className="loginContainer">
                <img src={logo} alt="" className="logo"></img>
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
            </form>
            <button className="adminBtn">
                <Link to="/adminLogin" style={{ textDecoration: 'none' }}>Login As Admin</Link>
            </button>
        </div>
    )
}

export default Login;