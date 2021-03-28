import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import PollIcon from '@material-ui/icons/Poll';
import GetAppIcon from '@material-ui/icons/GetApp';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';

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
      maxWidth: 180,
      maxHeight: 120,
      height: '100%',
      width: '180px',
      alignItems: "center",
      justify: "center"
    },
    container: {
        position: 'absolute'
    },
    buttonGroup: {
        top: '110px',
        width: '212px',
        marginLeft: -12,
        position: 'absolute'
    },
    hoverEdit: {
        borderRadius: '4px',
        width: '33.33%',
        "&:hover": {
          backgroundColor: 'rgb(177, 7, 7, 0.42)'
        }
    },
    hoverView: {
        borderRadius: '0px',
        width: '33.33%',
        "&:hover": {
          backgroundColor: 'rgb(7, 77, 177, 0.42)'
        }
    },
    hoverExport: {
        borderRadius: '4px',
        width: '33.33%',
        "&:hover": {
          backgroundColor: 'rgb(7, 177, 77, 0.42)'
        }
    }
}));

function PaperSurveyItem(props) {
    const classes = useStyles();

    const clickExport = () => {
        document.location.href = "/Survey/" + props.survey.id;
    }

    const clickEdit = () => {
        document.location.href = "/CreateSurvey/" + props.survey.id;
    }

    const clickView = () => {
        document.location.href = "/AnalyseSurvey/" + props.survey.id;
    }

    return(
    <Paper className={classes.paper}>
        <Grid container spacing={1} style={{width: '100%'}}>
            <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle2">
                    {props.survey.name}
                </Typography>
                <Divider />
            </Grid>

            <Grid item xs={12}>
                <Typography gutterBottom variant="body2">
                    {props.survey.questionText}
                </Typography>
            </Grid>

            <Grid container className={classes.container}>
                <ButtonGroup className={classes.buttonGroup} variant="contained" size="small" aria-label="small outlined button group">
                    <IconButton onClick={clickEdit} className={classes.hoverEdit} aria-label="edit">
                        <EditIcon></EditIcon>
                    </IconButton>
                    <IconButton onClick={clickView} className={classes.hoverView} aria-label="view">
                        <PollIcon></PollIcon>
                    </IconButton>
                    <IconButton onClick={clickExport} className={classes.hoverExport} aria-label="export">
                        <GetAppIcon></GetAppIcon>
                    </IconButton>
                </ButtonGroup>
            </Grid>

        </Grid>

    </Paper>
    );


}
export default PaperSurveyItem;