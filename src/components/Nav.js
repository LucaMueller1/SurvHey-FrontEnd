import React, {useState, useEffect} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import { AuthInterceptor } from '../services/AuthInterceptor';
import { requestService } from '../services/requestService'


export function Nav() {
    const navStyle= {
        color: "white"
    }
    
    const [user, setUser] = useState("");


    useEffect(() => {
        AuthInterceptor.intercept();
        requestService.getSurveys().then(res => {
          setUser("Test");
           
        }
            
            );
        
    }, []);

    
    
    return (
        <nav>
            <h3>{"Welcome "}</h3>
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