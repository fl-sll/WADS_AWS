import React from "react";
import {Link} from "react-router-dom";

function Login(){
    return(
        <div> 
            <div>
                <Link to="/dashboard">Dashboard</Link>
            </div>
            <p>hello</p>
        </div>
        
    )
}

export default Login;