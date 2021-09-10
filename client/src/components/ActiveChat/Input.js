import React, { useState } from "react";
import Axios from 'axios'
import { FormControl, FilledInput, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import FileCopyIcon from '@material-ui/icons/FileCopy';


const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
    position: 'relative'
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20
  },
  uploadButton: {
    position: 'absolute',
    top: '25%',
    right: '1em',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#7bd'
  },
  fileInput: {
    display: 'none'
  },
  numberOfFiles: {
    fontSize: 10,
    position: 'absolute',
    marginTop: '1.1em',
    marginLeft: '1em',
    color: 'white'
  }
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const { postMessage, otherUser, conversationId, user } = props;
  const [selectedFiles, setSelectedFiles] = useState({})

  function fileSelectedHandler(event) {
    console.log(event.target.files[0])
    setSelectedFiles({ ...selectedFiles, [event.target.files[0].name]: event.target.files[0] })
  }

  function fileUploadHandler() {
    const formData = new FormData()
    formData.append('file', selectedFiles)
    formData.append('upload_preset', 'glpgu45w')

    Axios.post(
      'https://api.cloudinary.com/v1_1/dzb4lljto/image/upload',
      formData
    ).then((response) => {
      console.log(response)
    })
    selectedFiles({})
  }

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: []
    };
    await postMessage(reqBody);
    setText("");
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl className={classes.uploadButton}>
        <FilledInput
          type="file"
          className={classes.fileInput}
          onChange={fileSelectedHandler}
        />
        <FileCopyIcon />
        {Object.keys(selectedFiles).length > 0 && (
          <Typography className={classes.numberOfFiles}>{Object.keys(selectedFiles).length}</Typography>
        )}
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
