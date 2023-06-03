import React, { useState , useEffect} from 'react';
import "../styles/adminDrop.css"

function Availabilitydropdown({ bookId, toggleImage }) {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    const handleStatusChange = (status) => {
        toggleImage(bookId, status);
    };

    return (
        <details
            onClick={handleClick}
            className={click ? 'dropdown-menus clicked' : 'dropdown-menus'}
        >
            <summary role="button">
                Change Status
            </summary>
            <li onClick={() => handleStatusChange("ordered")}>
                Cancel Order
            </li>
            <li onClick={() => handleStatusChange("collected")}>
                Accept Order
            </li>
        </details>
    );
}

export default Availabilitydropdown;