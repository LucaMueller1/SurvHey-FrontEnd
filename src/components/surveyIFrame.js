
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { requestService } from "../services/requestService";
import Survey from './Survey';


// Survey true/false = null abfragen dann Logik implementieren
//nicht null aus Daten den Survey aufbauen
//
export function SurveyIFrame() {
    let {id} = useParams();
    let survey = useEffect(() => {
        console.log(id);
        requestService.getSurveyById(id).then( res => {
            console.log(res.data);
            survey = res.data; 
        }).catch( err => {
            console.log(err);
            survey = null;
        });
        
        
    }, [id]); 

    if(survey === null) {
        return (
            <h3>error occured:</h3>
        )
    }
    
    return (
        <div>
            <Survey/>
        </div>
    
    );
}

export default SurveyIFrame;