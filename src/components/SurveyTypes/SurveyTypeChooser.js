import React, { useState, useEffect } from 'react';
import RadioSurvey from './RadioSurvey';
import { CheckBoxSurvey } from './CheckBoxSurvey';
import {ResultsChart} from '../ResultChart';

//SurveyTypeChooser should conditonally render the appropriate Survey to each SurveyType;
//Check the survey mode from the API´s SurveyList and renders the appropriate Survey 

export function SurveyTypeChooser(props) {

  const [surveyType, setSurveytype] = useState();
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    setSurveytype(props.surveyType);
    setShowResults(props.showResults);
    console.log(props.surveyType);
  }, [props]);
  
  

  if(surveyType === "RADIO"){
         return(
            <div>
              <RadioSurvey id={props.id} showResultChart={() => {setShowResults(true)}} surveyName={props.surveyName} questionText={props.questionText} surveyType={props.surveyType} answerOptions={props.answerOptions} accentColor={props.accentColor}/>
              {showResults ? <ResultsChart id={props.id}/> : null }
            </div>
        );
  } else if(surveyType === "CHECK"){
    return(
      <div>
        <CheckBoxSurvey id={props.id} showResultChart={() => {setShowResults(true)}} surveyName={props.surveyName} questionText={props.questionText} surveyType={props.surveyType} answerOptions={props.answerOptions} accentColor={props.accentColor}/>
        {showResults ? <ResultsChart id={props.id}/> : null }
      </div>
    );
  } else {
    return(
      <h2>Wrong Surveytype selected while creating!</h2>
    );
  }

}