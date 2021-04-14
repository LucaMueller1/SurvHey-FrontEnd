import React, {useEffect, useState} from 'react';
import SliderBar from '../components/SliderBar';
import MapChart from '../components/WorldMap';
import ReactTooltip from "react-tooltip";
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Autorenew } from '@material-ui/icons';
import { useParams } from "react-router";
import { requestService } from '../services/requestService';
import { AuthInterceptor } from '../services/AuthInterceptor';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(5),
    },
    paper: {
      margin: 'auto',
      marginTop: '1em',
      marginBottom: '1em',
      maxWidth: '66%',
      //maxHeight: 120,
      //height: '120px',
      //width: '180px',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: 'linear-gradient(45deg, #008a5e 30%, #3ac775 90%)',
    }
}));

 export function AnalyseSurvey() {
     let {id} = useParams();
     const [content, setContent] = useState("");
     const classes = useStyles();
     const [survey, setSurvey] = useState({});


     useEffect(() => {
        console.log(id);
        requestService.getSurveyById(id).then(res => {
            console.log(res.data);
            setSurvey(res.data); 
        }).catch(err => {
            console.log(err);
            setSurvey(null);
        });
        
    }, []); 

     return (
         <div className={classes.root}>
             <h1>{survey.questionText}</h1>
             <Grid spacing={12} direction="column">
                 <Grid item xs={12}>
                 <h3>Result Distribution</h3>
                    <Paper className={classes.paper}>
                        <SliderBar/>
                    </Paper>
                 </Grid>
                 <Grid item>
                 <h3>Geolocation Insights</h3>
                    <Paper className={classes.paper} m={300}>
                        <MapChart setTooltipContent={setContent}/>
                        <ReactTooltip>{content}</ReactTooltip>
                    </Paper>
                 </Grid>
             </Grid>
         </div>
     );
 }

export default AnalyseSurvey;