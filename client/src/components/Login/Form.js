import React from 'react'
import {
    Grid,
    Typography,
    Button,
    FormControl,
    TextField,
} from "@material-ui/core";
import { useStyles } from '../../loginStyles'

export default function Form({ type, handleRegister, handleLogin }) {
    const classes = useStyles()

    return (
        <form className={classes.form} onSubmit={type === 'login' ? handleLogin : handleRegister}>
            <Grid container item xs={12}>
                {/* this one for the header */}
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom><strong>{type !== 'login' ? 'Create an account.' : 'Welcome back!'}</strong></Typography>
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
                {type !== 'login' && <Grid item xs={12} >
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
                </Grid>}
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
                        {type === 'login' ? 'Login' : 'Register'}
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}
