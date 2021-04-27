import React from 'react';
import SurveyCreator from '../components/SurveyCreator';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    paper: {
      color: "white",
      background: 'linear-gradient(45deg, #008a5e 30%, #3ac775 90%)',
      marginBottom: "2%"
    },
    inputField: {
        padding: theme.spacing(4),
        // height: '120px',
        display: "inline-block",
        background: 'linear-gradient(45deg, #008a5e 30%, #3ac775 90%)',
        fontWeight: "bold",
        color: "white"

      },
      surveyPreview: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        display: "inline-block",
        background: 'linear-gradient(45deg, #008a5e 30%, #3ac775 90%)',
        fontWeight: "bold",
        color: "white"
      },
  }));

 export function CreateSurvey() {
     return (
         <div>
            <SurveyCreator classes={useStyles()}/>
        </div>
     );
 }


export default CreateSurvey;