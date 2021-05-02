import React, {useState, useEffect} from 'react';
import { requestService } from '../../services/requestService';
import { trackingService } from '../../services/trackingService';
import { Button} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import { FormControl, RadioGroup, FormControlLabel} from "@material-ui/core";
import { AuthInterceptor } from '../../services/AuthInterceptor';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import Confetti from 'react-confetti';
import {createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: '#fff',
  },
}));


function RadioSurvey(props) {
  const classes = useStyles();
  const [selectedAnswerId, setSelectedAnswerId] = useState(-1);
  const [id, setId] = useState(props.id);
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  const [confettiNumber, setConfettiNumber] = useState(0);
  const history = useHistory();

  console.log(props.accentColor)

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: props.accentColor !== null ? props.accentColor: "#ffff",
      },
      secondary: {
        main: props.accentColor !== null ? props.accentColor: "#ffff",
      },
    }
  });
  
  const openSurvey= e => {
    setToggle(true);
  }

  const onValueChange = e => {
    setSelectedAnswerId(Number(e.target.value));
  }

  const getResults = e => {
    //document.location.href="/AnalyseSurvey/" + props.id;
    history.push("/AnalyseSurvey/" + props.id);
  }


 const formSubmit = event => {
    event.preventDefault();
    // requestService.postSubmisson(this.props.id, this.state.selectedAnswerId);

    requestService.postSubmisson(id, [{id: selectedAnswerId}]).then(res => {
      if(res.data) {
          setConfettiNumber(200);
          props.showResultChart();
          console.log("Setting trackingToken to: " + res.data.participant.Cookie);
          trackingService.setTrackingToken(res.data.participant.Cookie);
      }
  }).catch(error => {
      console.log("Failed send submission");
      setOpen(true);
  });

 }

  const answers = props.answerOptions.map((answer, index) => {
    return (

      <FormControlLabel key={answer.id} value={answer.id} control={<Radio style ={{
        color: props.accentColor,
      }}/>} label={answer.content} />

    );
    });
  
    if(toggle === false){
        return(
          <ThemeProvider theme={theme}>
          <div>
            <h2>{props.questionText}</h2>
            <Button variant="outlined" color="primary" onClick={openSurvey}>participate</Button>
          </div>
          </ThemeProvider>
        );
      }
    else{ return(
      <ThemeProvider theme={theme} >
            <form onSubmit={formSubmit} >
              <h3>{props.questionText}</h3>
              
              <FormControl component="fieldset" style={{marginBottom: "5%"}}>
                <RadioGroup color={"blue"} aria-label="SurveyQuestions" name="surveys" value={selectedAnswerId} onChange={onValueChange}>
                  {answers}
                </RadioGroup>
              </FormControl>
              
              <br></br>
              <Button id="submitButton" variant="contained" color="primary" type="submit">submit</Button>
              <Backdrop className={classes.backdrop} open={open} onClick={() => {setOpen(false)}}>
              <Typography variant="h6">You can only participate once.</Typography>
              </Backdrop>
              <Confetti numberOfPieces={confettiNumber} recycle={false}/>
          </form>
          </ThemeProvider>

        );
      }

 }

  
  

  export default RadioSurvey;
