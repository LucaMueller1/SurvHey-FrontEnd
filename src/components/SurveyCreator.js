import React from 'react';
import { requestService } from '../services/requestService';
import { Button, IconButton } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import { AuthInterceptor } from '../services/AuthInterceptor';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import { SketchPicker } from 'react-color'
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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
      backgroundColor: '#fff',
      accentColor: '#fff',
      optionText: "",
      anchorHelp: null
    };
    this.formSubmit = this.formSubmit.bind(this);
    this.onChangeSurveyName = this.onChangeSurveyName.bind(this);
    this.goBack = this.goBack.bind(this);
    this.switchPhase = this.switchPhase.bind(this);
    this.onChangeQuestionText = this.onChangeQuestionText.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.onSurveyTypeChange = this.onSurveyTypeChange.bind(this);
    this.onChangeOption = this.onChangeOption.bind(this);
    this.onAnchorHelpChange = this.onAnchorHelpChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  
  
  //gets called when submitting the form
  formSubmit = (event) => {
    event.preventDefault();
    AuthInterceptor.intercept();

    requestService.postSurvey(this.state.surveyName,this.state.questionText,this.state.selectedSurveyType,this.state.answerOptions, this.state.backgroundColor, this.state.accentColor).then(res => {
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

  onAnchorHelpChange(event) {
    this.setState({
      anchorHelp: event.currentTarget
    });
  }

  handleClose() {
    this.setState({
      anchorHelp: null
    });
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

  onChangeOption(event) {
    this.setState({
      optionText: event.target.value
    })
    this.saveInput(event);
  }

  saveInput = (e) => {
    this.setState({ input: e.target.value });
  };

  addNewItem = () => {
    let { answerOptions, input } = this.state;
    answerOptions.push(input);
    this.setState({answerOptions: answerOptions})
  };

  handleBackgroundColor = (color) => {
    this.setState({ backgroundColor: color.hex });
  };

  handleAccentColor = (color) => {
    this.setState({ accentColor: color.hex });
  };

  cancelOptionInput = () => { 
    this.setState({
      optionText: ""
    })
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
          
          <Card className={classes.inputField}>
          <h2>Survey Name:</h2>
          <TextField InputProps={{style: {color: "white"}}} variant="outlined" value={this.state.surveyName} onChange={this.onChangeSurveyName}></TextField>
          
          <div style={{marginTop:"10%"}}>
        <Button variant="contained" color="primary" onClick={this.switchPhase}>Continue</Button>
        </div>
        </Card>
        </div>
      );
    }

    else if(this.state.phase === 1){
      return (
        <div>
          <Card className={classes.paper}><h3>2/5</h3></Card>
          <Card className={classes.inputField}>
          <h2>Background Color:</h2>
          <div style={{display: "inline-block"}}>
          <SketchPicker   color={ this.state.backgroundColor } onChangeComplete={ this.handleBackgroundColor}/>
          </div>
          <h3>Color is {this.state.backgroundColor}</h3>
          <div style={{marginTop:"10%"}}>
        <Button color="primary" onClick={this.goBack}>go back</Button>
        <Button variant="contained" color="primary" onClick={this.switchPhase}>Continue</Button>
        </div>
        </Card>
        </div>
      );
    }

    else if(this.state.phase === 2){
      return (
        <div>
          <Card className={classes.paper}><h3>3/5</h3></Card>
          <Card className={classes.inputField}>
          <h2>Accent Color:</h2>
          <div style={{display: "inline-block"}}>
          <SketchPicker   color={ this.state.accentColor } onChangeComplete={ this.handleAccentColor }/>
          </div>
          <h3>Color is {this.state.accentColor}</h3>
          <div style={{marginTop:"10%"}}>
        <Button color="primary" onClick={this.goBack}>go back</Button>
        <Button variant="contained" color="primary" onClick={this.switchPhase}>Continue</Button>
        </div>
        </Card>
        </div>
      );
    }

    else if(this.state.phase === 3) {
      return (
      <div>
        <Card className={classes.paper}><h3>4/5</h3></Card>
        <Card className={classes.inputField}>
        <h2>Survey Question:</h2>
          <TextField  InputProps={{style: {color: "white"}}} variant="outlined" value={this.state.questionText} onChange={this.onChangeQuestionText}></TextField>
        <h2>Survey Type:</h2>
        <Select
          label = "Survey Type"
          id="optionSelect"
          value={this.selectedSurveyType}
          onChange={this.onSurveyTypeChange}
          defaultValue={"radio"}
          style={{marginBottom: "10%", color:"white"}}
          InputProps={{style: {color: "white"}}}
        >
          <MenuItem value={"radio"}>Radio</MenuItem>
          <MenuItem value={"check"}>Checkbox</MenuItem>
        </Select>
        <IconButton onClick={this.onAnchorHelpChange} style={{marginBottom: "4%"}}><HelpOutlineIcon/></IconButton>

        <Popover
        open={Boolean(this.state.anchorHelp)}
        anchorEl={this.state.anchorHelp}
        onClose={this.handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        >
                <Box p={1} className={classes.popoverBox} textAlign="center">
                    <Typography>Radio button: single choice</Typography>
                    <Typography>Checkbox: multiple choice</Typography>
                </Box>
            </Popover>

        <div style={{marginTop:"10%"}}>
        <Button color="primary" onClick={this.goBack}>go back</Button>
        <Button variant="contained" color="primary" onClick={this.switchPhase}>Continue</Button>
        </div>
        </Card>
        </div>
     
    );}

    else if(this.state.phase === 4) {
      return (
      <div>
        <Card className={classes.paper}><h3>5/5</h3></Card>
        <Card className={classes.inputField}>
        <h2>Answer Options:</h2>
          <TextField InputProps={{style: {color: "white"}}} id="option-input" value={this.state.optionText} variant="outlined" onChange={this.onChangeOption}></TextField>
          <Button
          variant="contained"
          color="primary"
          startIcon={<Icon>add_circle</Icon>}
          onClick={this.onClickInputButton}
        >
          Add Option
      </Button>
        
        <br></br>
        <h3>Your Options:</h3>
          {this.state.answerOptions.map((subItems, sIndex) => {
            return <div key={sIndex}> {subItems} </div>
          })}
       <div style={{marginTop:"10%"}}>
        <Button color="primary" onClick={this.goBack}>go back</Button>
        <Button variant="contained" color="primary" onClick={this.switchPhase}>Show SurvHey</Button>
        </div>
        </Card>
        </div>
     
    );}

    //Liste mit dem JSX Element als Inhalt
    else if(this.state.phase === 5){
      return (
        <form>
          <Card className={classes.paper}><h3>Survey Preview</h3></Card>
          <Card className={classes.inputField}>

          <h3>Title:</h3>
          <h2>{this.state.surveyName}</h2>
          <Divider/>
          <h3>Question:</h3>
          <h2>{this.state.questionText}</h2>
          <Divider/>
          <h3>Type:</h3>
          <h2>{this.state.selectedSurveyType}</h2>
          <Divider/>
          <h2>Answer Options:</h2>
          {this.state.answerOptions.map((opt, index) => {
            return (
              <div>
                <div key={index}> {opt} </div>
              </div>
            )
          })}
          <div style={{marginTop:"10%"}}>
        <Button color="primary" onClick={this.goBack}>go back</Button>
        <Button variant="contained" color="primary" type="submit" onClick={this.formSubmit}>Submit Survey</Button>
        </div>
        </Card>
        </form>
      );
    }
    return null;
    }
  
}

export default  withRouter(SurveyCreator);