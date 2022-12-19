import React from "react";
import { Link } from "react-router-dom";


const Navigation = () => {
    return(
        <ul>
            <li>
            <Link to="/">Home Page</Link>
            </li>
            <li>
            <Link to="/addresses">Addresses</Link>
            </li>
        </ul>
    );
};

export default Navigation;