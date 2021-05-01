import React, {useState, useEffect} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import { AuthInterceptor } from '../services/AuthInterceptor';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { useHistory } from "react-router";
import { AuthService } from '../services/authService';
import Logo from '../media/SurvHeyLogo.png';


export function Nav() {
    const history = useHistory();

    const navStyle = {
        color: "white",
        //width: "100%",
        //height: "100px",
        textDecoration: "none",
        marginBottom: "2em",
        padding: "1%"
    }

    const logoStyle = {
        position: "absolute",
        top: "0px",
        marginTop: "-8px",
        height: "80px"
    }

    const navTitle = {
        color: "white",
        flexGrow: 1,
        textDecoration: "none",
    }
    
    const [user, setUser] = useState("");

    useEffect(() => {
        AuthInterceptor.intercept();
        // TODO requestService.getSurveys().then(res => {
        //   setUser(res.data[0][ 'user']);
        // }
        //     );
    }, []);

    const logout = () => {
        AuthInterceptor.intercept();
        AuthService.logout();
        //history.replace("/login"); --> issues with wrong password state
        document.location.href = "/login";
    }
    
    return (
        <div style={{flexGrow: 1}}>
        <AppBar position="static" color="transparent" style={navStyle}>
            <Toolbar>
                <IconButton edge="start" onClick={() => {history.push("/")}}>
                    <HomeIcon fontSize="large" style={{color: "white"}}/>
                </IconButton>

                <Link style={navTitle} to="">
                    
                    <Typography variant="h4">SurvHey<img src={Logo} style={logoStyle} align="middle" alt="SurvHeyLogo"/></Typography>
                    
                </Link>

                <IconButton edge="end" onClick={logout}>
                    <ExitToAppIcon fontSize="large" style={{color: "white"}}/>
                </IconButton>
                
                {/* TODO <h3>{"Welcome " + user.firstName}</h3> */}
                {/*<ul className="navLinks">
                    <Link style={navStyle} to="">
                        <li style={navStyle}>Home</li>
                    </Link>
                    <Link style={navStyle} to="/CreateSurvey">
                    <li>CreateSurvey</li>
                    </Link>
                    
                </ul>*/}
            </Toolbar>
        </AppBar>
        </div>
    );
}

export default Nav;