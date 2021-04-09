import React, {useState, useEffect} from 'react';
import { requestService } from '../../services/requestService';
import { Button} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import { FormControl, RadioGroup, FormControlLabel} from "@material-ui/core";
import { AuthInterceptor } from '../../services/AuthInterceptor';


function RadioSurvey(props) {

  const [selectedAnswerId, setSelectedAnswerId] = useState(-1);
  const [id, setId] = useState(props.id);
  const [toggle, setToggle] = useState(false);
  const [results, setResults] = useState([]);
  const [resultSum, setResultSum] = useState(0);

  useEffect(() => {
    AuthInterceptor.intercept();
    requestService.getResults(id).then(res => {
        setResults(Object.entries(res.data.choices));
    }
        
        );
    getResultSum();
    console.log(results)
    
}, []);
  
const getResultSum =async () => {
  await requestService.getAnalysis(id).then(res => {
      setResultSum(res.data.amount);
      console.log(res.data.amount);
  }).catch( error => {
      console.log(error);
  });
}
  
  const openSurvey= e => {
    setToggle(true);
  }

  const onValueChange = e => {
    setSelectedAnswerId(Number(e.target.value));
  }

  const getResults = e => {
    document.location.href="/AnalyseSurvey/" + props.id;
  }


 const formSubmit = event => {
    alert("answer submitted");
    event.preventDefault();
    console.log(id);
    // requestService.postSubmisson(this.props.id, this.state.selectedAnswerId);

    requestService.postSubmisson(id, [{id: selectedAnswerId}]);
    console.log("submisson posted");
    
  }

  const answers = props.answerOptions.map((answer, index) => {
    return (

      <FormControlLabel key={answer.id} value={answer.id} control={<Radio />} label={answer.content  + " " +  results[0][1]} />

    );
    });

    /*  
    <label key={index}>
        <Radio key={index} id={index} type="radio" value={answer.id} checked={selectedAnswerId == answer.id} onChange={onValueChange}/>
      {answer.content}
      <br></br>
      </label>
    */

  
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
                <RadioGroup aria-label="SurveyQuestions" name="surveys" value={selectedAnswerId} onChange={onValueChange}>
                  {answers}
                </RadioGroup>
              </FormControl>
              
              <Button variant="contained" color="primary" type="submit">Send Answer</Button>
              <Button variant="contained" onClick={getResults}>Analyse Survey</Button>
          </form>
        );
      }

 }

  
  

  export default RadioSurvey;
