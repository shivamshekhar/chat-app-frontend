import React from "react";
import "./index.css";
import SpeechBubble from "../speech-bubble";

export default class MessageDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const speechBubbles = [];
    const messages = this.props.messages || [];
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      speechBubbles.push(<SpeechBubble key={i} message={messages[i].content} isFriend={messages[i].isFriend} />);
    }

    return <div className="chat-div">{speechBubbles}</div>;
  }
}
