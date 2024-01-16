import React from "react";
import "./NavBar.css";
import {NavLink} from "react-router-dom";

const NavBar = ({toggleSideNavBar}) =>{
    return (
        <div className="navbar-container">
            <div className="navbar-content">
                <div className="navbar-heading">
                    <NavLink to="/" className="navbar-navlink"> Admin Dashboard </NavLink>
                </div>
                <div className="navbar-links">
                    <div className="navbar-links-cont">
                    <div className="navbar-items"><NavLink to="/" className="navbar-links-navlink"> Home </NavLink></div>
                    <div className="navbar-items"><NavLink to="/gallery" className="navbar-links-navlink"> Gallery </NavLink></div>
                    <div className="navbar-items"><NavLink to="/activity" className="navbar-links-navlink"> Activity </NavLink></div>
                    </div>
                </div>
            <div className="navbar-cont4">
                <button onClick={toggleSideNavBar} className="side-navbar-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            </div>
        </div>  
    )
}


export default NavBar;