import React from 'react';
import { useParams } from "react-router";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    iframe: {
        height: "300px",
        width: "320px",
        overflow: "hidden"
    }
}));
 
export function ExportSurvey() {
    const classes = useStyles();
    let {id} = useParams();

     return (
         <div>
            <h1>Export your SurvHey</h1>
            <iframe className={classes.iframe} title="survey" src={"/Survey/" + id}/>
         </div>
     );
}


export default ExportSurvey;