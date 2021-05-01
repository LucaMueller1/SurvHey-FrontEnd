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
import Container from '@material-ui/core/Container'
import PaperSurveyItem from '../components/PaperSurveyItem';
import Fab from '@material-ui/core/Fab';
import Popover from '@material-ui/core/Popover';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useHistory } from "react-router";

const helpPopoverData = [
    {
        text: "Click here to create a new survey",
        position: {
            top: 200,
            left: 200
        },
        showSampleSurvey: false
    },
    {
        text: "You can manage all your surveys on this screen",
        position: {
            top: 300,
            left: 500
        },
        showSampleSurvey: false
    },
    {
        text: "Hover over your surveys to show the controls",
        position: {
            top: 200,
            left: 420
        },
        showSampleSurvey: true
    },
    {
        text: "Click here to log out",
        position: {
            top: 50,
            left: 60206
        },
        showSampleSurvey: false
    }
];

const useStyles = makeStyles((theme) => ({
    root: {
      //flexGrow: 1,
      //padding: theme.spacing(2),
      //paddingLeft: '12%',
      //margin: '1%',
      //height: '120px',
      //width: '100%'
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    popoverBox: {
        width: "180px",
        //background: 'linear-gradient(45deg, #008a5e 30%, #3ac775 90%)'
    },
    paper: {
      padding: theme.spacing(2),
      marginLeft: "2%",
      marginTop: "2%",
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
    //help popover
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverState, setPopoverState] = useState(0);

    const history = useHistory();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const popoverForwards = () => {
        if(popoverState < (helpPopoverData.length-1)) {
            setPopoverState(popoverState+1);
        }
    }

    const popoverBackwards = () => {
        if(popoverState > 0) {
            setPopoverState(popoverState-1);
        }
    }
    

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
            history.push("/login");
        } else {
            fetchData();
        }
      }, []);
    

    return (
        <div className={classes.root}>
            <Container maxWidth={false}>
            <Grid container spacing={3}>
                        <Grow in={true}>
                            <Paper className={classes.paper} onClick={() => {history.push("/CreateSurvey")}}>
                                <Box className={classes.createNew}>
                                    <Typography gutterBottom variant="h6">
                                        Create New
                                    </Typography>
                                    <AddIcon fontSize="large"/>
                                </Box>
                            </Paper>
                        </Grow>

                        {helpPopoverData[popoverState].showSampleSurvey && <PaperSurveyItem survey={{name: "Sample Survey", questionText: "What is your favorite game?"}}></PaperSurveyItem>}
                    
                    {surveyList.map(survey => (
                       
                            <PaperSurveyItem survey={survey}></PaperSurveyItem>
                        
                    ))}
            </Grid>
            <Fab onClick={handleClick} size="medium" color="secondary" aria-label="add" className={classes.fab}>
                <Typography variant="h5">?</Typography>
            </Fab>
            </Container>

            <Popover
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onExited={() => {setPopoverState(0)}}
            anchorReference="anchorPosition"
            anchorPosition={ helpPopoverData[popoverState].position }
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            >
                <Box p={1} className={classes.popoverBox} textAlign="center">
                    <Typography>{helpPopoverData[popoverState].text}</Typography>
                    <ButtonGroup style={{marginTop: "8px"}} size="small" variant="contained" color="secondary">
                        <IconButton onClick={popoverBackwards} disabled={(popoverState === 0)} color="secondary"><ChevronLeftIcon/></IconButton>
                        <IconButton onClick={popoverForwards} disabled={(popoverState === helpPopoverData.length-1)} color="secondary"><ChevronRightIcon/></IconButton>
                    </ButtonGroup>
                </Box>
            </Popover>
        </div>
    )

    
}