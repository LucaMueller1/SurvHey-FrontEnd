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
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { SketchPicker } from 'react-color'
import Card from '@material-ui/core/Card';




const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    //margin: 'auto',
    //maxWidth: 180,
    //maxHeight: 120,
    height: '120px',
    width: '180px',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    background: 'linear-gradient(45deg, #008a5e 30%, #3ac775 90%)',
  },
}));


class SurveyCreator extends React.Component {
  constructor() {
    super();
    this.state = {
      surveyName: "",
      questionText: "",
      surveyTyp: ["radio","checkbox"],
      selectedSurveyType: "radio",
      phase: 0,
      answerOptions: [],
      selectedOption: "",
      background: '#fff',
     
    };
    this.formSubmit = this.formSubmit.bind(this);
    this.onChangeSurveyName = this.onChangeSurveyName.bind(this);
    this.goBack = this.goBack.bind(this);
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
      alert("Your survey was submited sucessfully.");
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

  goBack(event) {
    this.setState({
      phase: event.target.value = this.state.phase - 1
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

  cancelOptionInput = () => { 
    document.getElementById("option-input").value = "";
  }
  onClickInputButton = (event) => {
    this.addNewItem();
    this.cancelOptionInput();
  }
//axios library --> eigene JS Methode

//SequenzDiagramm --> Verschiedene Phasen
  render() {
    const { classes } = this.props;

    if(this.state.phase === 0){
      return (
        <div>
          <Card className={classes.paper}><h3>1/5</h3></Card>
          <h2>Survey Name:</h2>
          <Card className={classes.inputField}>
          <TextField  variant="outlined" value={this.state.surveyName} onChange={this.onChangeSurveyName}></TextField>
          </Card>
          <div style={{marginTop:"2%"}}>
        <Button variant="contained" color="primary" onClick={this.switchPhase}>Continue</Button>
        </div>
        </div>
      );
    }

    else if(this.state.phase === 1){
      return (
        <div>
          <Card className={classes.paper}><h3>2/5</h3></Card>
          <h2>Background Color:</h2>
          <div style={{display: "inline-block"}}>
          <SketchPicker   color={ this.state.background } onChangeComplete={ this.handleChangeComplete }/>
          </div>
          <h3>Color is {this.state.background}</h3>
          <div style={{marginTop:"2%"}}>
        <Button color="primary" onClick={this.goBack}>go back</Button>
        <Button variant="contained" color="primary" onClick={this.switchPhase}>Continue</Button>
        </div>
        </div>
      );
    }

    else if(this.state.phase === 2){
      return (
        <div>
          <Card className={classes.paper}><h3>3/5</h3></Card>
          <h2>Accent Color:</h2>
          <div style={{display: "inline-block"}}>
          <SketchPicker   color={ this.state.background } onChangeComplete={ this.handleChangeComplete }/>
          </div>
          <h3>Color is {this.state.background}</h3>
          <div style={{marginTop:"2%"}}>
        <Button color="primary" onClick={this.goBack}>go back</Button>
        <Button variant="contained" color="primary" onClick={this.switchPhase}>Continue</Button>
        </div>
        </div>
      );
    }

    else if(this.state.phase === 3) {
      return (
      <div>
        <Card className={classes.paper}><h3>4/5</h3></Card>
        <h2>Survey Question:</h2>
        <Card className={classes.inputField}>
          <TextField  variant="outlined" value={this.state.questionText} onChange={this.onChangeQuestionText}></TextField>
        </Card>
        <h2>Survey Type:</h2>
        <Card className={classes.inputField}>
        <Select
          label = "Survey Type"
          id="optionSelect"
          value={this.selectedSurveyType}
          onChange={this.onSurveyTypeChange}
          defaultValue={"radio"}
        >
          <MenuItem value={"radio"}>Radio</MenuItem>
          <MenuItem value={"check"}>Checkbox</MenuItem>
        </Select>
        <div>{this.selectedSurveyType}</div>
        </Card>
  
        <div style={{marginTop:"2%"}}>
        <Button color="primary" onClick={this.goBack}>go back</Button>
        <Button variant="contained" color="primary" onClick={this.switchPhase}>Continue</Button>
        </div>
      </div>
     
    );}

    else if(this.state.phase === 4) {
      return (
      <div>
        <Card className={classes.paper}><h3>5/5</h3></Card>
        <h2>Answer Options:</h2>
        <Card className={classes.inputField}>
          <TextField id="option-input" variant="outlined" onChange={this.saveInput}></TextField>
          <Button
          variant="contained"
          color="primary"
          startIcon={<Icon>add_circle</Icon>}
          onClick={this.onClickInputButton}
        >
          Add Option
      </Button>
        </Card>
        
        <br></br>
        <h3>Your Options:</h3>
          {this.state.answerOptions.map((subItems, sIndex) => {
            return <div key={sIndex}> {subItems} </div>
          })}
       <div style={{marginTop:"2%"}}>
        <Button color="primary" onClick={this.goBack}>go back</Button>
        <Button variant="contained" color="primary" onClick={this.switchPhase}>Show SurvHey</Button>
        </div>
        </div>
     
    );}

    //Liste mit dem JSX Element als Inhalt
    else if(this.state.phase === 5){
      return (
        <form>
          <Card className={classes.paper}><h3>Survey Preview</h3></Card>

          <h2>Survey Title:</h2>
          <Card className={classes.surveyPreview}><h3>{this.state.surveyName}</h3></Card>
          
          <h2>Survey Question:</h2>
          <Card className={classes.surveyPreview}><h3>{this.state.questionText}</h3></Card>
          
          <h2>Survey Type:</h2>
          <Card className={classes.surveyPreview}><h3>{this.state.selectedSurveyType}</h3></Card>
          
          <h2>Answer Options:</h2>
          <Card className={classes.surveyPreview}>
          {this.state.answerOptions.map((opt, index) => {
            return (
              <div>
                <div key={index}> {opt} </div>
              </div>
            )
          })}
          </Card>
          <div style={{marginTop:"2%"}}>
        <Button color="primary" onClick={this.goBack}>go back</Button>
        <Button variant="contained" color="primary" type="submit" onClick={this.formSubmit}>Submit Survey</Button>
        </div>
        </form>
      );
    }
    return null;
    }
  
}

export default  withRouter(SurveyCreator);