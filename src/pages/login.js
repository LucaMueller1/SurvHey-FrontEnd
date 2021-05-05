import React, { useState }from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { LocalGasStation, SentimentSatisfiedTwoTone } from '@material-ui/icons';
import { requestService } from '../services/requestService';
import { AuthService} from '../services/authService';
import Logo from '../media/SurvHey.png';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">
        SurvHey
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url('+Logo+')',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  inputField: {
    color:"white"
  }
}));

export default function SignInSide() {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [registered, setRegistered] = useState(true);
  const [wrongCred, setWrongCred] = useState(false);

  const handlelogin  = e => {
      e.preventDefault();
      console.log("login");
      AuthService.authenticate(email, password).then(res => {
        if(res.data) {
            console.log("Setting auth-token");
            AuthService.setToken(res.data.authKey);
            AuthService.setUserName(res.data.user.firstName);
            setWrongCred(false);
            document.location.href = "/";
        }
    }).catch(error => {
      console.log("Error during authentication");
      setWrongCred(true);
      if(error.response && error.response.status === 403) {
        console.log("Wrong username or password");
      }
    })
  };

  const handleRegistration  = e => {
    e.preventDefault();
    console.log("registrating");
    requestService.createUser(email, password, lastName, firstName).then(res => {
      console.log("User created");
      setRegistered(true);
    }).catch(error => {
      console.log(error);
      console.log("Error while creating user");
      setWrongCred(true);
    });
};

  const onEmailChange = e => {
    setEmail(e.target.value);
  }

  const onPasswordChange = e => {
    setPassword(e.target.value);
  }
  const onFirstNameChange = e => {
    setFirstName(e.target.value);
  }
  const onLastNameChange = e => {
    setLastName(e.target.value);
  }
 
  const onRegister = e => {
      setRegistered(false);
      setWrongCred(false);
  }
  const onBacktoLogin= e => {
    setRegistered(true);
    setWrongCred(false);
}

if(registered === false){
    return(
        <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid style={{backgroundColor: "#f5f5f5"}} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create Account
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleRegistration}>
              <TextField
                error={wrongCred}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                inputProps={{style:{height:"2em"}}}
                onChange={onEmailChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onPasswordChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                inputProps={{style:{height:"2em"}}}
                name="lastName"
                label="Last Name"
                id="lastName"
                onChange={onLastNameChange}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                inputProps={{style:{height:"2em"}}}
                name="firstName"
                label="First Name"
                id="firstName"
                onChange={onFirstNameChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Create Account
              </Button>
              <Grid container>
              <Grid item>
                <Button variant="outlined" color="secondary" onClick={onBacktoLogin} align="center">
                    Already registered? Login here
                </Button>  
              </Grid>
            </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );
}

  return (
    <Grid  container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid style={{backgroundColor: "#f5f5f5"}} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handlelogin}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              fullHeight
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputProps={{style:{height:"2em"}}}
              onChange={onEmailChange}

            />
            <TextField
              error={wrongCred}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              fullHeight
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onPasswordChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid>
              <Grid item>
                <Button variant="outlined" color="secondary" onClick={onRegister}>
                    Create Account
                </Button>  
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}