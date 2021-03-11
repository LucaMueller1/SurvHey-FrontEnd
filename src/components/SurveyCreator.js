import React from 'react';
import { requestService } from '../services/requestService';
import { Button, FormControl, Radio, RadioGroup, FormLabel, FormControlLabel} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { Fragment } from 'react';
//import Radio from '@material-ui/core/Radio';
//import {exportSurveyData} from '../services/exportSurveyData'



class SurveyCreator extends React.Component {
  constructor() {
    super();
    this.state = {
      surveyName: "Enter your Surveys name",
      questionText: "Enter your Question",
      surveyTyp: "radio",
      phase: 0,
      answerOptions: [],
      selectedOption: ""
    };
    this.formSubmit = this.formSubmit.bind(this);
    this.onChangeSurveyName = this.onChangeSurveyName.bind(this);
    this.switchPhase = this.switchPhase.bind(this);
    this.onChangeQuestionText = this.onChangeQuestionText.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
  }
  
  //gets called when submitting the form
  formSubmit = (event) => {
    event.preventDefault();
    alert("Survey was Submited sucessfull");
    //Post Data to API in here
    requestService.postSurvey(this.state.surveyName,this.state.questionText,this.state.surveyTyp,this.state.answerOptions);
  }
  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }

  switchPhase(event) {
    this.setState({
      phase: event.target.value = this.state.phase + 1
    });
  }

  onChangeSurveyName(event) {
    this.setState({
        surveyName: event.target.value
    })
}
  onChangeQuestionText(event) {
    this.setState({
      questionText: event.target.value
    })
  }

  saveInput = (e) => {
    this.setState({ input: e.target.value });
  };

  addNewItem = () => {
    let { answerOptions, input } = this.state;
    answerOptions.push(input);
    this.setState({answerOptions: answerOptions})
  };
//axios library --> eigene JS Methode

//SequenzDiagramm --> Verschiedene Phasen
  render() {
    if(this.state.phase === 0){
      return(
      <div>
        <h3>Create your own Survey!</h3>
        <Button variant="contained" onClick={this.switchPhase}>Create!</Button>
      </div>
      )
    }


    if(this.state.phase === 1){
      return (
        <div>
          <input type="text" value={this.state.surveyName} onChange={this.onChangeSurveyName}></input>
          <Button variant="contained" onClick={this.switchPhase}>Continue</Button>
        </div>
      );
    }

    else if(this.state.phase === 2) {
      return (
      <div>
        <h3>{this.state.surveyName}</h3>
        <input type="text" value={this.state.questionText} onChange={this.onChangeQuestionText}></input>
        <br></br>
        <label for="optionSelect">Choose answer option type</label>
        <select id="optionSelect"> 
          <option value={this.state.surveyTyp}>{this.state.surveyTyp}</option>
        </select>
        <br></br>

        <Button variant="contained" onClick={this.switchPhase}>Continue</Button>
      </div>
     
    );}

    else if(this.state.phase === 3) {
      return (
      <div>
        <h3>{this.state.surveyName}</h3>
        <h3>{this.state.questionText}</h3>
        <label>Enter an answer Option</label>
        <input type="text" onChange={this.saveInput}></input>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Icon>add_circle</Icon>}
          onClick={this.addNewItem}
        >
          Add answer
      </Button>
        <br></br>
        <label>Your answers:</label>
        <ol>
          {this.state.answerOptions.map((subItems, sIndex) => {
            return <li key={sIndex}> {subItems}</li>
          })}
        </ol>
        <Button variant="contained" onClick={this.switchPhase}>Show Survey</Button>
        </div>
     
    );}

    //Liste mit dem JSX Element als Inhalt
    else if(this.state.phase === 4){
      return (
        <form>
          <h3>Title: {this.state.surveyName}</h3>
          <h3>Question: {this.state.questionText}</h3>
          <h3>AnswerOptions:</h3>
          {this.state.answerOptions.map((opt, index) => {
            return (
              <div>
                <input id={opt} type={this.state.surveyTyp} key={index} value={opt} onChange={this.onValueChange} />
                <label key={index}for="opt">{opt}</label>
              </div>
            )
          })}
          <Button variant="contained" color="primary" type="submit" onClick={this.formSubmit}>Submit Survey</Button>
        </form>
      );
    }
    return null;
    }
  
}

export default SurveyCreator;