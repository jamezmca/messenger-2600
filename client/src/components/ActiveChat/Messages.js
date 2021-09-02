import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  //going to merge sort the messages by time
  function merge(left, right) {
    let arr = []
    while (left.length && right.length) {
      if (left.createdAt < right.createdAt) {
        arr.push(left.shift())
      } else {
        arr.push(right.shift())
      }
    }
    return [...arr, ...left, ...right]
  }

  function orderMessagesByTime(messages) {
    const half = messages.length / 2

    // Base case or terminating case
    if (messages.length < 2) {
      return messages
    }

    const left = messages.splice(0, half)
    return merge(orderMessagesByTime(left), orderMessagesByTime(messages))
  }

  const { messages, otherUser, userId } = props;

  return (
    <Box>
      {orderMessagesByTime([...messages]).map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
        ) : (
          <OtherUserBubble key={message.id} text={message.text} time={time} otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
