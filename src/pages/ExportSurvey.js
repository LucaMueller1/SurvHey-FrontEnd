import React, { useState } from 'react';
import { useParams } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Popover } from '@material-ui/core';

const helpPopoverData = [
    {
        text: "This page shows how your embedded survey would look like",
        position: {
            top: 300,
            left: 400
        }
    },
    {
        text: "This URL contains your survey. Use it to embed your survey",
        position: {
            top: 220,
            left: 260
        }
    },
    {
        text: "Copy this iFrame HTML-tag to include your survey in your website",
        position: {
            top: 220,
            left: 900
        }
    }
];

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
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    popoverBox: {
        width: "180px",
    },
    privacyContainer: {
        margin: theme.spacing(2)
    },
    privacyPaper: {
        position: 'absolute',
        width: 600,
        backgroundColor: "#121212",
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }
}));
 
export function ExportSurvey() {
    const classes = useStyles();
    let {id} = useParams();

    //help popover
    const [anchorEl, setAnchorEl] = useState(null);
    const [popoverState, setPopoverState] = useState(0);
    const [privacyModal, setPrivacyModal] = useState(false);

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

     return (
         <div>
            <h1>Export your SurvHey</h1>
            <form className={classes.rootTextfield} noValidate autoComplete="off">
                <TextField className={classes.textfield} InputProps={{className: classes.inputTextfield}} InputLabelProps={{className: classes.textfieldLabel}} id="url-textfield" label="URL" variant="standard" value={window.location.origin + "/Survey/" + id}/>
                <TextField className={classes.textfield} InputProps={{className: classes.inputTextfield}} InputLabelProps={{className: classes.textfieldLabel}} id="iframe-code-textfield" label="iFrame-Code" variant="standard" value={'<iframe height="300px" width="320px" title="survey" src="' + window.location.origin + "/Survey/" + id + '"/>'}/>
            </form>
            <iframe height="300px" width="320px" title="survey" src={"/Survey/" + id}/>

            <div className={classes.privacyContainer}>
                <Button onClick={() => {setPrivacyModal(true)}} variant="contained" color="default" endIcon={<HelpIcon/>} >Privacy</Button>
                <Modal
                open={privacyModal}
                onClose={() => setPrivacyModal(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                    <div className={classes.privacyPaper}>
                        <Typography variant="h4">Privacy Statement - SurvHey</Typography>
                        <Typography>A data processing agreement (DPA) between you and the website owner mentioning SurvHey as sub-contractor is necessary. A DPA between you and SurvHey is necessary as well. The website owner is responsible for consent banners. For further information see GDPR, especially Art.28</Typography>
                    </div>
                </Modal>
            </div>

            <Fab onClick={handleClick} size="medium" color="secondary" aria-label="add" className={classes.fab}>
                <Typography variant="h5">?</Typography>
            </Fab>

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
     );
}


export default ExportSurvey;