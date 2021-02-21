import React from 'react';
import './App.css';
import {CreateSurvey} from './pages/CreateSurvey';
import {ExportSurvey} from './pages/ExportSurvey';
import {AnalyseSurvey} from './pages/AnalyseSurvey';
import {Nav} from './components/Nav';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Home} from './pages/home';

function App() {
  return (
    <div>
      <Router>
        <div className="App">
            <Nav/>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/CreateSurvey" component={CreateSurvey}/>
              <Route path="/ExportSurvey" component={ExportSurvey} />
              <Route path="/AnalyseSurvey" component={AnalyseSurvey}/>
            </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
