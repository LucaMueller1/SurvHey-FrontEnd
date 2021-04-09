import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import PollIcon from '@material-ui/icons/Poll';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grow from '@material-ui/core/Grow';
import { requestService } from '../services/requestService';
import { Fade } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: '180px',
      maxHeight: '120px',
      height: '120px',
      width: '180px',
      alignItems: "center",
      justify: "center",
      "& .buttonMenu": {
        display: "none"
      },
      "&:hover .buttonMenu": {
        display: "block"
      }
    },
    questionText: {
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    hoverEdit: {
        borderRadius: '4px',
        width: '25%'
    },
    hoverView: {
        borderRadius: '0px',
        width: '25%'
    },
    hoverExport: {
        borderRadius: '4px',
        width: '25%'
    },
    hoverDelete: {
        borderRadius: '4px',
        width: '25%',
        "&:hover .deleteButton": {
            color: "red"
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

    const [wrap, setWrap] = useState(false);

    const clickDelete = () => {
        requestService.deleteSurvey(props.survey.id).then(res => {
            document.location.reload();
        }).catch(err => {
            console.log("Error while deleting survey with id: " + props.survey.id);
        });
    }

    return(
    <Grow in={true}>
        <Paper className={classes.paper} onMouseEnter={() => {setWrap(true)}} onMouseLeave={() => {setWrap(false)}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography gutterBottom noWrap={wrap} variant="subtitle2">
                        {props.survey.name}
                    </Typography>
                    <Divider/>
                </Grid>

                <Grid item xs={12}>
                    <Typography className={classes.questionText} noWrap={wrap} gutterBottom variant="body2">
                        {props.survey.questionText}
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Fade in={wrap}>
                    <ButtonGroup fullWidth className={"buttonMenu"} variant="contained" size="small" aria-label="small outlined button group">
                        <IconButton onClick={clickEdit} className={classes.hoverEdit} aria-label="edit">
                            <EditIcon></EditIcon>
                        </IconButton>
                        <IconButton onClick={clickView} className={classes.hoverView} aria-label="view">
                            <PollIcon></PollIcon>
                        </IconButton>
                        <IconButton onClick={clickExport} className={classes.hoverExport} aria-label="export">
                            <GetAppIcon></GetAppIcon>
                        </IconButton>
                        <IconButton onClick={clickDelete} className={classes.hoverDelete} aria-label="export">
                            <DeleteIcon className={"deleteButton"}></DeleteIcon>
                        </IconButton>
                    </ButtonGroup>
                    </Fade>
                </Grid>
            </Grid>
        </Paper>
    </Grow>
    );


}
export default PaperSurveyItem;