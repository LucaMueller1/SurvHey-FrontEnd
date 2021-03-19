import React, { useEffect, useState } from 'react';
import logo from '../SurvHeyLogo.png';
import { requestService } from '../services/requestService';
import RadioSurvey from '../components/RadioSurvey';
import { AuthService } from '../services/authService';
import { AuthInterceptor } from '../services/AuthInterceptor';
import { Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
      paddingLeft: '200px',
      height: '100%',
      width: '100%'
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 800,
      height: '100%',
      width: '180px',
      alignItems: "center",
      justify: "center"
    },
    container: {
        alignItems: "center",
        justify: "center"
    }
}));

export function Home() {
    const classes = useStyles();
    const [surveyList, setSurveyList] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => {
        AuthInterceptor.intercept();
        //check if authenticated
        if(!AuthService.getToken()) {
            document.location.href="/login";
        } else {
            fetchData();
        }
      }, []);

    console.log(surveyList);
    let SurveysToRender;
    if (surveyList) {
        SurveysToRender = surveyList.map(( survey, index) => {
            return(
                <RadioSurvey id={survey.id} key={index} surveyName={survey.name} questionText={survey.questionText} surveyType={survey.answerMode} answerOptions={survey.answerOptions}/>
                );
            })
        } else {
            SurveysToRender = "No Surveys found. Please start by creating one...";
        }

    console.log(surveyList);
    

    return (
        <div className={classes.root}>
            <Grid container spacing={2} direction="row">
                    <Grid container item xs={2} spacing={1} className={classes.container}>
                        <Paper className={classes.paper} onClick={() => {document.location.href = "/CreateSurvey"}}>
                            <Typography gutterBottom variant="h6">
                                Create New
                            </Typography>
                            <AddIcon fontSize="large"/>
                        </Paper>
                    </Grid>
                    {SurveysToRender.map(survey => (
                        <Grid container item xs={2} spacing={1} className={classes.container}>
                            <Paper className={classes.paper}>
                                {survey}
                            </Paper>
                        </Grid>
                    ))}
            </Grid>
        </div>
    )

    
}