import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  Hidden
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { login } from "./store/utils/thunkCreators";
import Image from 'material-ui-image'
import image from './assets/bg-img.png'
// const image = require('./assets/bg-img.png')
console.log(image)

//for the stoopid fookin button grid position relative and then the span absolute
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    width: '100vw'
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 'auto',
    maxWidth: '100%',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    flexGrow: 1
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  span: {
    right: 10,
    top: '50%',
    position: 'absolute',
    fontSize: 12,
    color: theme.palette.primary.main,
    cursor: 'pointer'
  },
  box: {
    display: 'flex'
  },
  passwordInput: {
    position: 'relative'
  },
  createAccountButton: {
    marginLeft: 30,
    border: 'none',
    boxShadow: '0 0 4px 1px hsla(10, 10%, 65%, 0.3), 0 0 2px 8px hsla(10, 10%, 90%, 0.2)',
    fontSize: 12,
    border: '1px solid white'
  },
  loginButton: {
    marginTop: 40,
  },
  contentContainer: {
    padding: 30
  },
  createAccountContainer: {
    height: 'maxContent'
  }

}))

const Login = (props) => {
  const history = useHistory();
  const { user, login } = props;
  const classes = useStyles()

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container className={classes.root} justifyContent="center" alignItems="center">
      <Box className={classes.box}>
        {/* this one for image */}
        <Hidden xsDown>
          <Grid item sm={5} container justifyContent='flex-end'>
            <img src={image} alt="people messaging" className={classes.image}/>
          </Grid>
        </Hidden>


        {/* this one for inputs */}
        <Grid container item xs={12} sm={7} className={classes.contentContainer}>
          {/* this one for the register */}
          <Grid container item xs={12} sm={12} alignItems="center" justifyContent="flex-end">
            <Typography variant="subtitle2">Don't have an account?</Typography>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              className={classes.createAccountButton}
              onClick={() => history.push("/register")}>Create account</Button>
          </Grid>


          <form className={classes.form}>
            {/* this one for the form */}
            <Grid container item xs={12}>
              {/* this one for the header */}
              <Grid item xs={12}>
                <Typography variant="h4">Welcome back!</Typography>
              </Grid>
              <Grid item xs={12} >
                <FormControl margin="normal" required fullWidth >
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                  />
                </FormControl>
              </Grid>
              <Grid container item xs={12} >
                <FormControl margin="normal" required fullWidth className={classes.passwordInput}>
                  <TextField
                    label="Password"
                    aria-label="password"
                    type="password"
                    name="password"
                  />
                  <span role="button" className={classes.span}>Forgot?</span>
                </FormControl>
              </Grid>
              <Grid container item xs={12} justifyContent="center">
                <Button type="submit" variant="contained" size="large" color="primary" className={classes.loginButton}>
                  Login
              </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Box>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
