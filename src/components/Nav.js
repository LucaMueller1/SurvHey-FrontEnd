import React from 'react';
import '../App.css';
import {Link, withRouter } from 'react-router-dom';

export function Nav() {
    const navStyle= {
        color: "white"
    }
    
    return (
        <nav>
            <h3>Logo</h3>
            <ul className="navLinks">
                <Link style={navStyle} to="">
                    <li>Home</li>
                </Link>
                <Link style={navStyle} to="/CreateSurvey">
                    <li>CreateSurvey</li>
                </Link>
                <Link style={navStyle}  to="/AnalyseSurvey">
                    <li>AnalyseSurvey</li>
                </Link>
                <Link style={navStyle} to="/ExportSurvey">
                    <li>ExportSurvey</li>
                </Link>
            </ul>
        </nav>
    );
}

export default Nav;