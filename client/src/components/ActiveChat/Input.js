import React, { useState } from "react";
import { FormControl, FilledInput, Button } from "@material-ui/core";
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
    right: 0,
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#7bd',
    padding: 0
  },
  fileInput: {
    display: 'none',
  }
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [uploadedImage, setUploadedImage] = useState([])
  const { postMessage, otherUser, conversationId, user } = props;

  async function fileSelectedHandler({ target }) {
    const { files } = target
    try {
      let secure_urls = await Promise.all(
        Array.from(files).map((file) => file).map(async file => {
          const formData = new FormData()
          formData.append('file', file)
          formData.append('upload_preset', `${process.env.REACT_APP_UPLOAD_PRESET}`)

          const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, {
            method: "POST",
            body: formData
          })
          const { secure_url } = await res.json()
          return secure_url
        })
      )
      setUploadedImage([...uploadedImage, ...secure_urls])

    } catch (err) {
      console.error(err)
    }
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
      attachments: uploadedImage
    };


    await postMessage(reqBody)
    setText("");
    setUploadedImage([])
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit} encType='multipart/form-data'>
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
      <Button
        className={classes.uploadButton}
        component="label"
      >
        <input
          type="file"
          className={classes.fileInput}
          onChange={fileSelectedHandler}
          multiple
        />
        <FileCopyIcon />
      </Button>
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
