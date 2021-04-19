import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { requestService } from "../services/requestService";
import RadioSurvey from './SurveyTypes/RadioSurvey';
import { SurveyTypeChooser } from "./SurveyTypes/SurveyTypeChooser";
import  PopUp  from './PopUp';
import Button from '@material-ui/core/Button';
import HelpIcon from '@material-ui/icons/Help';


// Survey true/false = null abfragen dann Logik implementieren
//nicht null aus Daten den Survey aufbauen
//
export function SurveyIFrame() {
    let {id} = useParams();
    const [survey, setSurvey] = useState({});
    const [seen, setSeen] = useState(false);

    const [buttonPopUp, setButtonPopUp] = useState(false);
    

    useEffect(() => {
        console.log(id);
        requestService.getSurveyById(id).then(res => {
            console.log(res.data);
            setSurvey(res.data);
            //document.body.style = 'background: ' + (res.data.backgroundColor == null ? "#282c34" : res.data.backgroundColor);
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
                <br></br>
                <div>
                    <Button onClick={() => setButtonPopUp(true)} variant="contained" color="default" endIcon={<HelpIcon/>}  > Privacy
                    </Button>
                    <PopUp trigger={buttonPopUp} setTrigger={setButtonPopUp}>
                        <p id="popup-text">A data processing agreement (DPA) between you and the website owner mentioning SurvHey as sub-contractor is necessary. A DPA between you and SurvHey is necessary as well. The website owner is responsible for consent banners. For further information see GDPR, especially Art.28 </p>
                    </PopUp>
                </div>
            </div>
        
        );
    }
    
}

export default SurveyIFrame;