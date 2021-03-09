import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
export function Nav() {
    const navStyle= {
        color: "white"
    }
    
    /*<Link style={navStyle}  to="/AnalyseSurvey">
                    <li>AnalyseSurvey</li>
                </Link>
                <Link style={navStyle} to="/ExportSurvey">
                    <li>ExportSurvey</li>
                </Link>
                */
    return (
        <nav>
            <h3>Welcome User</h3>
            <ul className="navLinks">
                <Link style={navStyle} to="">
                    <li style={navStyle}>Home</li>
                </Link>
                <Link style={navStyle} to="/CreateSurvey">
                  <li>CreateSurvey</li>
                </Link>
                
            </ul>
        </nav>
    );
}

export default Nav;