import React from 'react';
import { useParams } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    rootTextfield: {
        '& > *': {
            margin: theme.spacing(1),
          },
    },
    inputTextfield: {
        backgroundColor: "white",
    },
    textfield: {
        color: "white",
        width: "400px",
        marginBottom: theme.spacing(3)
    },
    textfieldLabel: {
        color: "white",
    }
}));
 
export function ExportSurvey() {
    const classes = useStyles();
    let {id} = useParams();

     return (
         <div>
            <h1>Export your SurvHey</h1>
            <form className={classes.rootTextfield} noValidate autoComplete="off">
                <TextField className={classes.textfield} InputProps={{className: classes.inputTextfield}} InputLabelProps={{className: classes.textfieldLabel}} id="url-textfield" label="URL" variant="standard" value={window.location.origin + "/Survey/" + id}/>
                <TextField className={classes.textfield} InputProps={{className: classes.inputTextfield}} InputLabelProps={{className: classes.textfieldLabel}} id="iframe-code-textfield" label="iFrame-Code" variant="standard" value={'<iframe height="300px" width="320px" title="survey" src="' + window.location.origin + "/Survey/" + id + '"/>'}/>
            </form>
            <iframe height="350px" width="350px" title="survey" src={"/Survey/" + id}/>
         </div>
     );
}


export default ExportSurvey;