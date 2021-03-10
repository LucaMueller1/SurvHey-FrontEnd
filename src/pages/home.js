import React, { useEffect, useState } from 'react';
import logo from '../SurvHeyLogo.png';
import { requestService } from '../services/requestService';
import Survey from '../components/Survey';

export function Home() {
    const [surveyList, setSurveyList] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
        try {
          const result = await requestService.getSurveys();
     
          setSurveyList(result.data);
        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
    };
     
        fetchData();
      }, []);

    console.log(surveyList);
    //Logik for return JSX Survey:
    /*
        <Survey key={index} surveyName={survey.surveyName} questionText={survey.questionText} surveyType={survey.surveyType} 
        answeroptions={survey.answerOptions}  />
    */
    let SurveysToRender;
    if (surveyList) {
        SurveysToRender = surveyList.map(( survey, index) => {
            return(
                <Survey id={survey.id} key={index} surveyName={survey.name} questionText={survey.questionText} surveyType={survey.answerMode} answerOptions={survey.answerOptions}/>
                );
            })
        } else {
            SurveysToRender = "Loading...";
        }

    console.log(surveyList);
    
    return (
            <div>
                <div className="Greetings">
                    <h1>Welcome to SurvHey</h1>
                    <img className="HomeLogo"src={logo} alt="SurvHeyLogo"/>
                </div>
                <div className="SurveyList">
                    <h2>My Surveys: </h2>
                    <h3>Find your created Surveys down below: </h3> 
                        <p>View them again or participate yourself</p>
                    <ul>
                        {SurveysToRender}
                    </ul>
                </div>
            </div>
        
     );

    
}