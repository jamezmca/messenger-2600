import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  Hidden
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import image from './assets/bg-img.png'
import { ReactComponent as BubbleSVG } from './assets/bubble.svg'
import { useStyles } from './loginStyles'

const Login = (props) => {
  const history = useHistory();
  const { user, register } = props;
  const classes = useStyles()
  const [formErrorMessage, setFormErrorMessage] = useState({});

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }

    await register({ username, email, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid container className={classes.root} justifyContent="center" alignItems="center">
      <Box className={classes.box}>
        {/* this one for image */}
        <Hidden xsDown>
          <Grid item sm={5} container justifyContent='center' className={classes.imageContainer}>
            <img src={image} alt="people messaging" className={classes.image} />
            <Grid item container justifyContent="center" alignItems="center" className={classes.imageOverlay}>
              <Typography variant="h5" align="center" className={classes.svgText}>
                <BubbleSVG className={classes.bubbleSVG} />
                <br />Converse with anyone with any language
                </Typography>
            </Grid>
          </Grid>
        </Hidden>

        {/* this one for inputs */}
        <Grid container item xs={12} sm={7} className={classes.contentContainer}>
          {/* this one for the register */}
          <Grid container item xs={12} sm={12} alignItems="center" justifyContent="flex-end" className={classes.registerContainer}>
            <Typography variant="body2" className={classes.noAccountText}>Already have an account?</Typography>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              className={classes.createAccountButton}
              onClick={() => history.push("/login")}>
              <Typography variant="subtitle2" className={classes.buttonText}>Login</Typography>
            </Button>
          </Grid>

          <form className={classes.form} onSubmit={handleRegister}>
            {/* this one for the form */}
            <Grid container item xs={12}>
              {/* this one for the header */}
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom><strong>Create an account.</strong></Typography>
              </Grid>
              <Grid item xs={12} >
                <FormControl margin="normal" required fullWidth >
                  <TextField
                    aria-label="username"
                    label="Username"
                    name="username"
                    type="text"
                    required
                    InputLabelProps={{ required: false }}
                    className={classes.textField}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <FormControl margin="normal" required fullWidth >
                  <TextField
                    label="E-mail address"
                    aria-label="e-mail address"
                    type="email"
                    name="email"
                    required
                    InputLabelProps={{ required: false }}
                    className={classes.textField}
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
                    required
                    InputLabelProps={{ required: false }}
                    className={classes.textField}
                  />
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
