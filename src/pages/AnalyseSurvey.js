import React, {useState} from 'react';
import SliderBar from '../components/SliderBar';
import MapChart from '../components/WorldMap';
import ReactTooltip from "react-tooltip";
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Autorenew } from '@material-ui/icons';

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
      backgroundColor: "#00a86b"
    }
}));

 export function AnalyseSurvey() {
     const [content, setContent] = useState("");
     const classes = useStyles();
     return (
         <div className={classes.root}>
             <h1>SurvHey Analysis</h1>
             <Grid spacing={12} direction="column">
                 <Grid item xs={12}>
                 <h2>Result Distribution</h2>
                    <Paper className={classes.paper}>
                        <SliderBar/>
                    </Paper>
                 </Grid>
                 <Grid item>
                 <h2>Geolocation Insights</h2>
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