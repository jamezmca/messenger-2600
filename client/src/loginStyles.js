import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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
    imageContainer: {
      position: 'relative',
      maxWidth: 'max-content'
  
    },
    imageOverlay: {
      position: 'absolute',
      inset: '0 0 0 0',
      color: 'white',
      padding: '20%',
      background: 'linear-gradient(to top, #86B9FFcc, #3A8DFFaa)',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
      flexGrow: 1,
      maxWidth: 350,
      minHeight: '90%',
      display: 'flex',
      alignItems: 'center'
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    },
    span: {
      right: 10,
      top: '55%',
      position: 'absolute',
      fontSize: 11,
      color: theme.palette.primary.main,
      cursor: 'pointer',
      fontWeight: 800,
      fontFamily: 'Montserrat'
    },
    box: {
      display: 'flex',
      justifyContent: 'center'
    },
    passwordInput: {
      position: 'relative',
    },
    createAccountButton: {
      marginLeft: 30,
      boxShadow: '0 0 4px 1px hsla(180, 50%, 65%, 0.3), 0 0 2px 8px hsla(10, 10%, 90%, 0.3)',
      fontSize: 12,
      border: '1px solid white',
      padding: '12px 25px',
      fontFamily: 'Monserrat',
      minWidth: 120
    },
    loginButton: {
      marginTop: 40,
      padding: '10px 50px',
      fontFamily: 'Montserrat',
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
    },
    textField: {
      padding: '10px 0 0 2px'
    },
    svgText: {
      paddingBottom: 100
    },
    bubbleSVG: {
      marginBottom: 40
    }
  }))
  