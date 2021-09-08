import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,
  Hidden
} from "@material-ui/core";
import { register } from "./store/utils/thunkCreators";
import { useStyles } from './loginStyles'
import LoginImage from "./components/Login/LoginImage";
import Form from "./components/Login/Form";

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
          <LoginImage/>
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
          <Form type="register" handleRegister={handleRegister} />
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
