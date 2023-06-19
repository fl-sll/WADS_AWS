import React, { useState , useEffect} from 'react';
import "../styles/Dropdown.css"
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import { BACKEND_LINK } from "./Const";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRightFromBracket, faUser} from '@fortawesome/free-solid-svg-icons'

function Navdropdown() {
    const [click, setClick] = useState(false);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleClick = () => setClick(!click);

    const handleLogout = () => {
        window.localStorage.removeItem("access_token");
        navigate("/")
    };

    useEffect(() => {
        const token = window.localStorage.getItem("access_token");
        axios
            .get(BACKEND_LINK + "/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                setName(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <>
            <ul
                onClick={handleClick}
                className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
            >
                <div className="displayname">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div>
                        {/* <FontAwesomeIcon icon={faUser} /> */}
                        <p>{name}</p>
                        </div>
                    )}
                </div>
                <li id='logoutBtn'>
                    <Link
                        to={"/"}
                        onClick={() => {
                            handleLogout();
                            setClick(false);
                        }}
                        style={{ textDecoration: 'none' , color: 'white' }}
                    >
                        {/* <FontAwesomeIcon icon={faRightFromBracket} /> */}
                        Logout 
                        <FontAwesomeIcon icon={faRightFromBracket} />
                    </Link>
                </li>
            </ul>
        </>
    );
}

export default Navdropdown;