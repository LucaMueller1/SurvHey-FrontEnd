import React, { useState, useEffect} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControl, FormGroup, FormLabel, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import { requestService } from '../../services/requestService';
import { Button} from '@material-ui/core';
import { AuthInterceptor } from '../../services/AuthInterceptor'
import { useHistory } from "react-router";


export function CheckBoxSurvey(props){

    const [selectedIDs, setSelectedIDs] = React.useState({});
    const [id, setId] = useState(props.id);
    const [toggle, setToggle] = useState(false);

    const [results, setResults] = useState([]);
    const [resultSum, setResultSum] = useState(0);

    const history = useHistory();

    useEffect(() => {
      let ids = {};
      props.answerOptions.map(answer => {
        ids[answer.id] = false;
      });
      setSelectedIDs(ids);
    }, []);

    

    const openSurvey= e => {
      setToggle(true);
    }
  
    const onValueChange = e => {
      setSelectedIDs(Number(e.target.value))
      console.log(selectedIDs);
    }
  
  
   const formSubmit = event => {
      event.preventDefault();
      // requestService.postSubmisson(this.props.id, this.state.selectedAnswerId);
  
      console.log(selectedIDs);
      let arr = [];
      for (let key in selectedIDs) {
        console.log("KEY: " + key);
        if(selectedIDs[key] === true) {
          arr.push(key);
        }
      }
      console.log(arr);
      
      requestService.postSubmisson(id, toAnswerOptionIDs(arr)).then(res => {
        props.showResultChart();
        console.log("submisson posted");
      }).catch(error => {
        console.log(error);
      });
      
    }

    const toAnswerOptionIDs = (list) => {
      let rList = [];
      list.forEach(function(element){
          rList.push({"id": element});
      });
      return rList;
    }

    const handleChange = (event) => {
      setSelectedIDs({ ...selectedIDs, [event.target.value]: event.target.checked });
    };
  
    //algorithm to handle answer and checking logic for multiple answer options
    /*const onCheckboxAnswerChange = event => {
      console.log(selectedIDs);
      if(selectedIDs.find(event.target.value) === false){
        setSelectedIDs(selectedIDs.push(event.target.value));
        console.log("not found in Array...answer added")
      }
      else{
        let index = selectedIDs.indexOf(event.target.value);
          setSelectedIDs(selectedIDs.splice(index, 1));
          console.log("Element already found, got removed");
      }
    }
   */

    const answers = props.answerOptions.map((answer, index) => {
      return (
  
        <FormControlLabel key={answer.id} value={answer.id} control={<Checkbox />} label={answer.content}/>
  
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
                <FormGroup aria-label="SurveyQuestions" name="surveys" value={selectedIDs} onChange={handleChange}>
                  {answers}
                </FormGroup>
              </FormControl>
              <br></br>
              <Button id="submitButton" variant="contained" color="primary" type="submit">Send Answer</Button>
          </form>
        );
      }

 }

  
  

  export default CheckBoxSurvey;


