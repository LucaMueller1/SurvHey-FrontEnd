import React, { useState, useEffect} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControl, FormGroup, FormLabel, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import { requestService } from '../../services/requestService';
import { Button} from '@material-ui/core';


export function CheckBoxSurvey(props){

    const [selectedAnswerIds, setSelectedAnswerIds] = useState([]);
    const [id, setId] = useState(props.id);
    const [toggle, setToggle] = useState(false);
    
    const openSurvey= e => {
      setToggle(true);
    }
  
    const onValueChange = e => {
      setSelectedAnswerIds(Number(e.target.value))
      console.log(selectedAnswerIds);
    }
  
    const getResults = e => {
      document.location.href="/AnalyseSurvey/" + props.id;
    }
  
  
   const formSubmit = event => {
      alert("answer submitted");
      event.preventDefault();
      console.log(id);
      // requestService.postSubmisson(this.props.id, this.state.selectedAnswerId);
  
      requestService.postSubmisson(id, [{id: selectedAnswerIds}]);
      console.log("submisson posted");
      
    }
  
    const answers = props.answerOptions.map((answer, index) => {
      return (
  
        <FormControlLabel key={answer.id} value={answer.id} control={<Checkbox />} label={answer.content} />
  
      );
      });

      if(toggle === false){
        return(
          <div>
            <h3>{props.surveyName}</h3>
            <Button variant="contained" onClick={openSurvey}>Show full Survey</Button>
          </div>
        );
      }
    else{ return(
            <form onSubmit={formSubmit}>
              <h3>{props.surveyName}</h3>
              <h4>{props.questionText}</h4>
              
              <FormControl component="fieldset">
                <FormGroup aria-label="SurveyQuestions" name="surveys" value={selectedAnswerIds} onChange={onValueChange}>
                  {answers}
                </FormGroup>
              </FormControl>
              
              <Button variant="contained" color="primary" type="submit">Send Answer</Button>
              <Button variant="contained" onClick={getResults}>Analyse Survey</Button>
          </form>
        );
      }

 }

  
  

  export default CheckBoxSurvey;


