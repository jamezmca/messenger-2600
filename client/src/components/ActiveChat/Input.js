import React, { useState } from "react";
import { FormControl, FilledInput, Typography, Button } from "@material-ui/core";
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
  },
  numberOfFiles: {
    fontSize: 10,
    position: 'absolute',
    marginTop: '1.1em',
    marginLeft: '1em',
    color: 'white',
  }
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [uploadedImage, setUploadedImage] = useState({})
  const [loading, setLoading] = useState(false)
  const { postMessage, otherUser, conversationId, user } = props;
  const [selectedFiles, setSelectedFiles] = useState([])

  async function fileSelectedHandler({ target }) {
    const { files } = target
    const formData = new FormData()
    formData.append('file', files[0])
    formData.append('upload_preset', 'glpgu45w')

    const res = await fetch('https://api.cloudinary.com/v1_1/dzb4lljto/image/upload', {
      method: "POST",
      body: formData
    })
    console.log(res)

    const { secure_url } = await res.json()

    setUploadedImage({
      image: secure_url,
      // largeImage: eager[0].secure_url,
    });

    setLoading(false)
  }
  console.log(selectedFiles)

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: [uploadedImage.image]
    };

    
    await postMessage(reqBody);
    setText("");
    setUploadedImage({})
    setLoading(true)
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
      <Button
        className={classes.uploadButton}
        component="label"
      >
        <input
          type="file"
          className={classes.fileInput}
          onChange={fileSelectedHandler}
        />
        <FileCopyIcon />
        {selectedFiles.length > 0 && (
          <Typography className={classes.numberOfFiles}>{selectedFiles.length}</Typography>
        )}
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
