import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { requestService } from "../services/requestService";
import RadioSurvey from './SurveyTypes/RadioSurvey';
import { SurveyTypeChooser } from "./SurveyTypes/SurveyTypeChooser";


// Survey true/false = null abfragen dann Logik implementieren
//nicht null aus Daten den Survey aufbauen
//
export function SurveyIFrame() {
    let {id} = useParams();
    const [survey, setSurvey] = useState({});

    useEffect(() => {
        console.log(id);
        requestService.getSurveyById(id).then(res => {
            console.log(res.data);
            setSurvey(res.data);
            document.body.style = 'background: ' + (res.data.backgroundColor == null ? "#282c34" : res.data.backgroundColor);
        }).catch(err => {
            console.log(err);
            setSurvey(null);
        });
        
    }, []); 

    if(survey === null) {
        return (
            <h3>error occured:</h3>
        )
    } else {
        return (
            <div>
                <SurveyTypeChooser id={id} surveyName={survey.name} questionText={survey.questionText} surveyType={survey.mode} answerOptions={survey.answerOptions}/>
            </div>
        
        );
    }
    
}

export default SurveyIFrame;