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

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    width: '100vw',
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 'auto',
    maxWidth: '100%',
    maxHeight: '100vh'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    flexGrow: 1,
    maxWidth: 400,
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  span: {
    right: 10,
    top: '52%',
    position: 'absolute',
    fontSize: 11,
    color: theme.palette.primary.main,
    cursor: 'pointer',
    fontWeight: 800,
    fontFamily: 'Montserrat'
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
    boxShadow: '0 0 4px 1px hsla(180, 50%, 65%, 0.3), 0 0 2px 8px hsla(10, 10%, 90%, 0.3)',
    fontSize: 12,
    border: '1px solid white',
    padding: '12px 25px',
    fontFamily: 'Monserrat'
  },
  loginButton: {
    marginTop: 40,
    padding: '10px 50px',
  },
  contentContainer: {
    padding: 30,
    justifyContent: 'center'
  },
  createAccountContainer: {
    height: 'maxContent'
  },
  noAccountText: {
    fontSize: 12,
    color: '#aaa',
    fontWeight: 600,
    fontFamily: 'Montserrat'
  },
  buttonText: {
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontSize: 12,
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
            <Typography variant="body2" className={classes.noAccountText}>Don't have an account?</Typography>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              className={classes.createAccountButton}
              onClick={() => history.push("/register")}>
                <Typography variant="subtitle2" className={classes.buttonText}>Create account</Typography>
              </Button>
          </Grid>


          <form className={classes.form} onSubmit={handleLogin}>
            {/* this one for the form */}
            <Grid container item xs={12}>
              {/* this one for the header */}
              <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>Welcome back!</Typography>
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
