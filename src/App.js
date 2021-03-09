import React from 'react';
import './App.css';
//import {CreateSurvey} from './pages/CreateSurvey';
import {ExportSurvey} from './pages/ExportSurvey';
import {AnalyseSurvey} from './pages/AnalyseSurvey';
import {Nav} from './components/Nav';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Home} from './pages/home';
import SurveyIFrame from './components/surveyIFrame';
import CreateSurvey from './pages/CreateSurvey';


function App() {
  return (
    <div>
      <Router>
        <Nav/>
        <div className="App" >
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/CreateSurvey" component={CreateSurvey} />
              <Route path="/ExportSurvey" component={ExportSurvey} />
              <Route path="/AnalyseSurvey" component={AnalyseSurvey}/>
              <Route path="/Survey/:id" component={SurveyIFrame}/>
            </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
