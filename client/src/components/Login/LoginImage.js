import React from 'react'
import {
    Grid,
    Typography,
} from "@material-ui/core";
import image from '../../assets/bg-img.png'
import { ReactComponent as BubbleSVG } from '../../assets/bubble.svg'
import { useStyles } from '../../loginStyles'

export default function LoginImage() {
    const classes = useStyles()

    return (
        <Grid item sm={5} container justifyContent='center' className={classes.imageContainer}>
            <img src={image} alt="people messaging" className={classes.image} />
            <Grid item container justifyContent="center" alignItems="center" className={classes.imageOverlay}>
                <Typography variant="h5" align="center" className={classes.svgText}>
                    <BubbleSVG className={classes.bubbleSVG} />
                    <br />Converse with anyone with any language
                </Typography>
            </Grid>
        </Grid>
    )
}
