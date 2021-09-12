import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  date: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5
  },
  text: {
    fontSize: 14,
    color: "#91A3C0",
    letterSpacing: -0.2,
    padding: 8,
    fontWeight: "bold"
  },
  bubble: {
    background: "#F4F6FA",
    borderRadius: "10px 10px 0 10px"
  },
  image: {
    maxHeight: 100,
    borderRadius: '10px 10px 0px 10px',
    margin: 5
  },
  imageText: {
    maxHeight: 100,
    borderRadius: '10px 10px 0px 10px',
  }
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, attachments } = props;
  if (attachments === null) return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      <Box className={classes.bubble}>
        <Typography className={classes.text}>{text}</Typography>
      </Box>
    </Box>
  );

  return (
    <Box className={classes.root}>
      <Typography className={classes.date}>{time}</Typography>
      {(attachments.length === 1 && text === "") && <img src={attachments[0]} alt="imageToSend" className={classes.image} />}
      <Box className={classes.bubble}>
        {(attachments.length === 1 && text !== "") && <img src={attachments[0]} alt="imageToSend" className={classes.imageText} />}

        <Typography className={classes.text}>{text}</Typography>
      </Box>
      {attachments.length > 1 && <Box>
        {attachments.map((attachment, i) => {
          return <img src={attachment} alt="imageToSend" key={`${attachment}${i}`} className={classes.image} />
        })}
      </Box>}

    </Box>
  )

};

export default SenderBubble;
