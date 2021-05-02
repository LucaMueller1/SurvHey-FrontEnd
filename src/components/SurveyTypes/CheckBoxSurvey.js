import React, { useState, useEffect} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControl, FormGroup, FormLabel, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import { requestService } from '../../services/requestService';
import { trackingService } from '../../services/trackingService';
import { Button} from '@material-ui/core';
import { AuthInterceptor } from '../../services/AuthInterceptor'
import { useHistory } from "react-router";
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Confetti from 'react-confetti';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: '#fff',
  },
}));


export function CheckBoxSurvey(props){
    const classes = useStyles();

    const [selectedIDs, setSelectedIDs] = React.useState({});
    const [id, setId] = useState(props.id);
    const [toggle, setToggle] = useState(false);

    const [results, setResults] = useState([]);
    const [resultSum, setResultSum] = useState(0);
    const [open, setOpen] = useState(false);
    const [confettiNumber, setConfettiNumber] = useState(0);

    const history = useHistory();

    const theme = createMuiTheme({
      palette: {
        primary: {
          main: props.accentColor !== null ? props.accentColor: "#ffff",
        },
        secondary: {
          main: props.accentColor !== null ? props.accentColor: "#ffff",
        },
      },
    });

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
        if(res.data) {
            setConfettiNumber(200);
            props.showResultChart();
            console.log("Setting trackingToken to: " + res.data.participant.Cookie);
            trackingService.setTrackingToken(res.data.participant.Cookie);

        }
    }).catch(error => {
        console.log("Failed send submission");
        setOpen(true);
        document.body.style.overflowX = "clip";

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
        <ThemeProvider theme={theme}>
        <FormControlLabel color="primary" key={answer.id} value={answer.id} control={<Checkbox style ={{
                      color: props.accentColor,
                    }}/>} label={answer.content}/>
        </ThemeProvider>
   
      );
      });

      if(toggle === false){
        return(
          <ThemeProvider theme={theme}>
          <div style={{marginTop: "5%"}}>
            <h2>{props.questionText}</h2>
            <Button variant="outlined" color="primary" onClick={openSurvey}>participate</Button>
          </div>
          </ThemeProvider>
        );
      }
    else{ return(
          <ThemeProvider theme={theme}>
            <div>
            <form onSubmit={formSubmit} >
              {/* <h3>{props.surveyName}</h3> */}
              <h3>{props.questionText}</h3>
              
              <FormControl color="primary" component="fieldset">
                <FormGroup color="primary" aria-label="SurveyQuestions" name="surveys" value={selectedIDs} onChange={handleChange}>
                  {answers}
                </FormGroup>
              </FormControl>
              <br></br>
              <Button style={{marginTop: "2%"}} id="submitButton" variant="contained" color="primary" type="submit">Submit</Button>
          </form>
              <Backdrop className={classes.backdrop} open={open} onClick={() => {setOpen(false)}}>
              <Typography variant="h6">You can only participate once.</Typography>
              </Backdrop>
              <Confetti numberOfPieces={confettiNumber} recycle={false}/>
          </div>
          </ThemeProvider>
        );
      }

 }

  
  

  export default CheckBoxSurvey;


