import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import cryptUtils from "../lib/cryptUtils";
import MessageInput from "./components/message-input";
import MessageDisplay from "./components/message-display";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

class ChatMenu extends React.Component {
  constructor(props) {
    super(props);
    this.messages = [
      {
        content: "hello",
        isFriend: false,
      },
      {
        content: "world",
        isFriend: true,
      },
      {
        content:
          "hello anasnjkadnkvjdsnfkjsadjkvsdnakcndskjvnaskcnsdjkvnakjscnkvnkancdsnvdkjsnckjdnvksnvkjsdnvkjsdnvjndskjvnsdvkjdsnvkdsnkvnsdnvkjsdnvjnsdkvnkdsnjksdnvkjsdnjvknkjsvnk",
        isFriend: false,
      },
      {
        content:
          "worlddsvldsnvjsdnvjksfnbkvdnkjvfbskvndkjvnsdjkfkeanaskjnsajknskjdnkjcsdkjcakcnsdkcnakcnkdcnajnckcnaksnaskjnkcanack",
        isFriend: true,
      },
      {
        content: "hello",
        isFriend: false,
      },
      {
        content: "world",
        isFriend: true,
      },
    ];
    this.state = {
      unsentMessage: null,
    };
  }

  _updateUnsentMessage(messageObj) {
    const state = { ...this.state, unsentMessage: messageObj.target.value };
    this.setState(state);
  }

  _sendMessage(evt) {
    evt.preventDefault();
    if (this.state.unsentMessage && this.state.unsentMessage.length) {
      this.messages.push({
        content: this.state.unsentMessage,
        isFriend: false,
      });
      const state = { unsentMessage: null };
      this.setState(state);
      evt.target.reset();
    }
  }

  render() {
    return (
      <div className="chat-menu-div">
        <MessageDisplay messages={this.messages} />
        <MessageInput
          onChange={this._updateUnsentMessage.bind(this)}
          onSubmit={this._sendMessage.bind(this)}
        />
      </div>
    );
  }
}

export default ChatMenu;
