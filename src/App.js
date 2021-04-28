import React, { useState } from 'react';
import './App.css';
//import {CreateSurvey} from './pages/CreateSurvey';
import {ExportSurvey} from './pages/ExportSurvey';
import {AnalyseSurvey} from './pages/AnalyseSurvey';
import {Nav} from './components/Nav';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Home} from './pages/home';
import SurveyIFrame from './components/surveyIFrame';
import CreateSurvey from './pages/CreateSurvey';
import Login from '../src/pages/login';
import { AuthService } from './services/authService';
import SignInSide from '../src/pages/login';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { green, lightGreen, teal, lime } from '@material-ui/core/colors';

const theme = createMuiTheme({
    typography: {
      fontFamily: [
        'Manrope',
        'sans-serif',
      ].join(','),
    },
    palette: {
      primary: lime
    },
    input: {
      color: "white"
    }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <Router>
      <Switch>
        <Route path="/login" component={SignInSide}/>
        <Route path="/Survey/:id" component={SurveyIFrame}/>
        <div>
           <Nav/>

            <Route path="/" exact component={Home}/>
            <Route path="/CreateSurvey" component={CreateSurvey} />
            <Route path="/ExportSurvey/:id" component={ExportSurvey} />
            <Route path="/AnalyseSurvey/:id" component={AnalyseSurvey}/>
        </div>
      </Switch>
      </Router>
    </div>
    </ThemeProvider>
  );
}

export default App;
