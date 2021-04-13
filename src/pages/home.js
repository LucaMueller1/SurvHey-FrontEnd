import React, { useEffect, useState } from 'react';
import { requestService } from '../services/requestService';
import { AuthService } from '../services/authService';
import { AuthInterceptor } from '../services/AuthInterceptor';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import Grow from '@material-ui/core/Grow';
import PaperSurveyItem from '../components/PaperSurveyItem';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
      paddingLeft: '12%',
      height: '100%',
      width: '100%'
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 180,
      maxHeight: 120,
      height: '120px',
      width: '180px',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      background: 'linear-gradient(45deg, #008a5e 30%, #3ac775 90%)',
    },
    createNew: {
        transition: "all .5s ease-in-out;",
      "&:hover": {
        cursor: "pointer",
        transform: "scale(1.1)"
      }
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
            console.log(result)
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
    

    return (
        <div className={classes.root}>
            <Grid container spacing={2} direction="row">
                    <Grid container item xs={2} spacing={1}>
                        <Grow in={true}>
                            <Paper className={classes.paper} onClick={() => {document.location.href = "/CreateSurvey"}}>
                                <Box className={classes.createNew}>
                                    <Typography gutterBottom variant="h6">
                                        Create New
                                    </Typography>
                                    <AddIcon fontSize="large"/>
                                </Box>
                            </Paper>
                        </Grow>
                    </Grid>
                    {surveyList.map(survey => (
                        <Grid container item xs={2} spacing={1}>
                            <PaperSurveyItem survey={survey}></PaperSurveyItem>
                        </Grid>
                    ))}
            </Grid>
        </div>
    )

    
}