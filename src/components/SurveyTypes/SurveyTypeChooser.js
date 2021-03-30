import React, { useState, useEffect } from 'react';
import RadioSurvey from './RadioSurvey';
import { CheckBoxSurvey } from './CheckBoxSurvey';


//SurveyTypeChooser should conditonally render the appropriate Survey to each SurveyType;
//Check the survey mode from the API´s SurveyList and renders the appropriate Survey 

export function SurveyTypeChooser(props) {

  const [surveyType, setSurveytype] = useState();

  useEffect(() => {
    setSurveytype(props.surveyType);
    console.log(props.surveyType);
  }, [props]);
  

  if(surveyType === "RADIO"){
         return(
            <div>
              <RadioSurvey id={props.id} surveyName={props.surveyName} questionText={props.questionText} surveyType={props.surveyType} answerOptions={props.answerOptions}/>
            </div>
        );
  } else if(surveyType === "CHECK"){
    return(
      <CheckBoxSurvey id={props.id} surveyName={props.surveyName} questionText={props.questionText} surveyType={props.surveyType} answerOptions={props.answerOptions}/>
    );
  } else {
    return(
      <h2>Wrong Surveytype selected while creating!</h2>
    );
  }

}