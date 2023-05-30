import React, { useState , useEffect} from 'react';
import "../styles/Dropdown.css"
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';

function Dropdown() {
    const [click, setClick] = useState(false);
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleClick = () => setClick(!click);

    const handleLogout = () => {
        window.localStorage.removeItem("access_token");
    };

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
                        <p>{name}</p>
                    )}
                </div>
                <li>
                    <Link
                        to={"/"}
                        onClick={() => {
                            handleLogout();
                            setClick(false);
                        }}
                        style={{ textDecoration: 'none' , color: 'white' }}
                    >
                        Logout
                    </Link>
                </li>
            </ul>
        </>
    );
}

export default Dropdown;