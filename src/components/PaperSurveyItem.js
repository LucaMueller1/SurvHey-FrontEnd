import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import PollIcon from '@material-ui/icons/Poll';
import GetAppIcon from '@material-ui/icons/GetApp';
import Divider from '@material-ui/core/Divider';
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
    container: {
        position: 'absolute'
    },
    buttonGroup: {

    },
    hoverEdit: {
        borderRadius: '4px',
        width: '33.33%'
    },
    hoverView: {
        borderRadius: '0px',
        width: '33.33%'
    },
    hoverExport: {
        borderRadius: '4px',
        width: '33.33%'
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
        <Grid container spacing={2}>
            <Grid item xs={12} wrap="nowrap">
                <Typography gutterBottom noWrap variant="subtitle2">
                    {props.survey.name}
                </Typography>
                <Divider />
            </Grid>

            <Grid item xs={12} wrap="nowrap">
                <Typography gutterBottom noWrap variant="body2">
                    {props.survey.questionText}
                </Typography>
            </Grid>

            <Grid item xs={12}>
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
                </ButtonGroup>
            </Grid>

        </Grid>

    </Paper>
    );


}
export default PaperSurveyItem;