import React from 'react';
import { requestService } from '../services/requestService';
import { Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { AuthInterceptor } from '../services/AuthInterceptor';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { SketchPicker } from 'react-color'



const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


class SurveyCreator extends React.Component {
  constructor() {
    super();
    this.state = {
      surveyName: "Enter your Surveys name",
      questionText: "Enter your Question",
      surveyTyp: ["radio","checkbox"],
      selectedSurveyType: "radio",
      phase: 0,
      answerOptions: [],
      selectedOption: "",
      background: '#fff'
     
    };
    this.formSubmit = this.formSubmit.bind(this);
    this.onChangeSurveyName = this.onChangeSurveyName.bind(this);
    this.switchPhase = this.switchPhase.bind(this);
    this.onChangeQuestionText = this.onChangeQuestionText.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.onSurveyTypeChange = this.onSurveyTypeChange.bind(this);
  }
  
  
  //gets called when submitting the form
  formSubmit = (event) => {
    event.preventDefault();
    AuthInterceptor.intercept();

    requestService.postSurvey(this.state.surveyName,this.state.questionText,this.state.selectedSurveyType,this.state.answerOptions).then(res => {
      alert("Survey was Submited sucessfull");
      this.props.history.push('');      //document.location.href = "/";
    }).catch(error => {
      console.log(error);
    });
  }


  onSurveyTypeChange(event){
    this.setState({
      selectedSurveyType: event.target.value
    });
    console.log(event.target.value)
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

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
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
          <input style={{width: "20%"}} type="text" value={this.state.surveyName} onChange={this.onChangeSurveyName}></input>
          <Button variant="contained" onClick={this.switchPhase}>Continue</Button>
          <h3>Select a color theme:</h3>
          <SketchPicker color={ this.state.background } onChangeComplete={ this.handleChangeComplete }/>
          <h3>Color is {this.state.background}</h3>
        </div>
      );
    }

    else if(this.state.phase === 2) {
      return (
      <div>
        <h3>{this.state.surveyName}</h3>
        <input style={{width: "20%"}} type="text" value={this.state.questionText} onChange={this.onChangeQuestionText}></input>
        <br></br>
        <label for="optionSelect">Choose answer option type</label>
        <select id="optionSelect" onChange={this.onSurveyTypeChange}> 
          <option value={"radio"}>Radio</option>
          <option value={"check"}>Checkbox</option>
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
        <input style={{width: "20%"}} type="text" onChange={this.saveInput}></input>
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
          {this.state.answerOptions.map((subItems, sIndex) => {
            return <div key={sIndex}> {subItems} </div>
          })}
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
                <div key={index}> {opt} </div>
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

export default  withRouter(SurveyCreator);