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
  CardMedia
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { login } from "./store/utils/thunkCreators";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width: '100vw'
  },
  image: {
    backgroundImage: "url('./assets/images/bg-img.png')",
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
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
    <Grid container justifyContent="center">
      <Box>
        {/* this one for image */}
        <Grid item xs={false} sm={4} className={classes.image} />

        {/* this one for inputs */}
        <Grid container item justifyContent="center" xs={12}>
          {/* this one for the register */}
          <Grid container item xs={12} alignItems="center" justifyContent="flex-end">
            <Typography>Don't have an account?</Typography>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={() => history.push("/register")}>Create account</Button>
          </Grid>

          {/* this one for the header */}
          <Grid item xs={12}>
            <Typography variant="h4">Welcome back!</Typography>
          </Grid>

          {/* this one for the form */}
          <Grid container item xs={12} >
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
            <Grid item xs={12} >
              <FormControl margin="normal" required fullWidth>
                <TextField
                  label="Password"
                  aria-label="password"
                  type="password"
                  name="password"
                />
              </FormControl>
            </Grid>
            <Grid container item xs={12} justifyContent="center">
              <Button type="submit" variant="contained" size="large" color="primary">
                Login
              </Button>
            </Grid>
          </Grid>
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
