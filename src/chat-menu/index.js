import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import cryptUtils from "../lib/cryptUtils";
import MessageInput from "./components/message-input";
import MessageDisplay from "./components/message-display";
import NameHeader from "./components/name-header";
import FriendsList from "./components/friends-list";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

class ChatMenu extends React.Component {
  constructor(props) {
    super(props);
    this.sessionToken = this.props.value.sessionToken;
    this.userName = this.props.value.userName;
    this.friendsList = [];
    this.messages = {};
    this.isLogin = this.props.value.isLogin;
    this.state = {
      unsentMessage: null,
      chattingWith: null,
    };
  }

  componentDidMount() {
    const encryptedUserName = cryptUtils.encryptString(this.userName);
    axios({
      baseURL: "http://localhost:4000",
      url: `/user/${encryptedUserName}/relation/friend`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "session-token": this.sessionToken,
      },
    })
      .then((res) => {
        res.data.forEach((f) => {
          f.name = cryptUtils.decryptString(f.name);
        });
        this.friendsList = res.data;
        this.forceUpdate();
      })
      .catch((err) => {
        const errorMessage =
          (err &&
            err.response &&
            err.response.data &&
            err.response.data.error) ||
          "Some error occurred!";
        toast(errorMessage, { type: "error" });
        const responseStatusCode = err && err.response && err.response.status;
        if (responseStatusCode == 401 || responseStatusCode == 403) {
          setTimeout(() => {
            this.props.handleLogin(false, {});
          }, 3000);
        }
      });
  }

  _updateUnsentMessage(messageObj) {
    const state = { ...this.state, unsentMessage: messageObj.target.value };
    this.setState(state);
  }

  _sendMessage(evt) {
    evt.preventDefault();
    if (
      this.state.chattingWith &&
      this.state.unsentMessage &&
      this.state.unsentMessage.length
    ) {
      const userName = cryptUtils.encryptString(this.userName);
      const message = cryptUtils.encryptString(this.state.unsentMessage);
      const friendName = cryptUtils.encryptString(this.state.chattingWith);
      const sessionToken = this.sessionToken;
      axios({
        baseURL: "http://localhost:4000",
        url: "/messaging/send",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          userName,
          message,
          friendName,
          sessionToken,
        },
      })
        .then(() => {
          this.messages[this.state.chattingWith] =
            this.messages[this.state.chattingWith] || [];
          this.messages[this.state.chattingWith].push({
            content: this.state.unsentMessage,
            isFriend: false,
          });
          const state = { unsentMessage: null };
          this.setState(state);
          evt.target.reset();
        })
        .catch((err) => {
          const errorMessage =
            (err &&
              err.response &&
              err.response.data &&
              err.response.data.error) ||
            "Some error occurred!";
          if (this.isLogin) {
            toast(errorMessage, { type: "error" });
          }
          const responseStatusCode = err && err.response && err.response.status;
          if (responseStatusCode == 401 || responseStatusCode == 403) {
            this.isLogin = false;
            setTimeout(() => {
              this.props.handleLogin(false, {});
            }, 3000);
          }
        });
    }
  }

  _pollMessage() {
    const userName = cryptUtils.encryptString(this.userName);

    axios({
      baseURL: "http://localhost:4000",
      url: `/messaging/${userName}/poll`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "session-token": this.sessionToken,
      },
    })
      .then((res) => {
        const data = (res && res.data) || [];
        for (let m of data) {
          const sentFrom = cryptUtils.decryptString(m.sentFrom);
          const message = cryptUtils.decryptString(m.message);
          this.messages[sentFrom] = this.messages[sentFrom] || [];
          this.messages[sentFrom].push({
            content: message,
            isFriend: true,
          });
        }

        if (data.length) {
          this.forceUpdate();
        }

        this._pollMessage();
      })
      .catch((err) => {
        const errorMessage =
          (err &&
            err.response &&
            err.response.data &&
            (err.response.data.error || err.response.data.message)) ||
          "Some error occurred!";
        toast(errorMessage, { type: "error" });
        const responseStatusCode = err && err.response && err.response.status;
        if (responseStatusCode == 401 || responseStatusCode == 403) {
          setTimeout(() => {
            this.props.handleLogin(false, {});
          }, 3000);
        }
      });
  }

  _selectFriend(name) {
    if (name !== this.state.chattingWith) {
      const state = { ...this.state, chattingWith: name };
      this.setState(state);
      this._pollMessage();
    }
  }

  render() {
    return (
      <div className="chat-menu-outer-div">
        <FriendsList
          friendsList={this.friendsList}
          selectFriend={this._selectFriend.bind(this)}
        />
        <div className="chat-menu-div">
          <NameHeader friendName={this.state.chattingWith} />
          <MessageDisplay messages={this.messages[this.state.chattingWith]} />
          <MessageInput
            onChange={this._updateUnsentMessage.bind(this)}
            onSubmit={this._sendMessage.bind(this)}
          />
        </div>
        <ToastContainer />
      </div>
    );
  }
}

export default ChatMenu;
