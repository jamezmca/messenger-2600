import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Box,
  Typography,
  Button,

  Hidden
} from "@material-ui/core";
import { login } from "./store/utils/thunkCreators";
import { useStyles } from './loginStyles'
import LoginImage from "./components/Login/LoginImage";
import Form from "./components/Login/Form";

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
          <LoginImage/>
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
          <Form type='login' handleLogin={handleLogin}/>
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
