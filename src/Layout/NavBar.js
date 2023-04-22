import React from "react";
import { Link } from "react-router-dom";

function NavBar({linkName="", link="", pageName=""}) {
    const multi = (
        <>
            <li className="breadcrumb-item">
                <Link to={link}>{linkName}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
                {pageName}
            </li>
        </>
    );

    const current = (
        <li className="breadcrumb-item active" aria-current="page">
            {pageName}
        </li>
    );

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item text-secondary">
                    <Link to="/">Home</Link>
                </li>
                {link !== "" ? multi : current}
            </ol>
        </nav>
    );
}

export default NavBar;