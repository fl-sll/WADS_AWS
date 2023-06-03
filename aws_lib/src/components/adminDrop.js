import React, { useState , useEffect} from 'react';
import "../styles/adminDrop.css"

function Availabilitydropdown({ id, toggleImage }) {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
  
    const handleStatusChange = (status) => {
      toggleImage(id, status);
    };

    return (
        <details
            onClick={handleClick}
            className={click ? 'dropdown-menus clicked' : 'dropdown-menus'}
        >
            <summary role="button">
                Change Status
            </summary>
            <li onClick={() => handleStatusChange("available")}>
                available
            </li>
            <li onClick={() => handleStatusChange("unavailable")}>
                unavailable
            </li>
        </details>
    );
}

export default Availabilitydropdown;