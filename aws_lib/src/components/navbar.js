import React, { useState , useEffect, useRef} from 'react'
import logo from "../assets/logo.png"
import "../styles/navbar.css"
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleUser} from '@fortawesome/free-solid-svg-icons'
import { useOnHoverOutside } from "./../hooks/Hover";
import axios from 'axios';
import Dropdown from "./Dropdown";

function Navbar(){
    const[name, setName] = useState("");
    const navigate = useNavigate();
    const dropdownRef = useRef(null); // Create a reference for dropdown container
    const [isMenuDropDownOpen, setMenuDropDownOpen] = useState(false);

    useEffect(() => {
        const token = window.localStorage.getItem("access_token");
        axios
            .get("http://localhost:8000/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                setName(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const closeHoverMenu = () => {
        setMenuDropDownOpen(false);
    };

    useOnHoverOutside(dropdownRef, closeHoverMenu); // Call the hook


    return(
        <div>
            <div className='top'>
                <Link to="/dashboard">
                    <img src={logo} alt="" className='logo'></img>
                </Link>
                <ul>
                    <li
                        className='nav-item'
                    >
                        <div className='profile_bar' ref={dropdownRef} class="">
                            <button className='profile' onMouseOver={() => setMenuDropDownOpen(true)}>
                                <Link>
                                    <FontAwesomeIcon icon={faCircleUser} size='3x'color='#b5b5b5'/>
                                </Link>
                            </button>
                            {isMenuDropDownOpen && <Dropdown />}
                        </div>
                    </li>
                </ul>
                {/* <p>{name}</p> */}

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

