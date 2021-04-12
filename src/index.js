import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MainMenu from "./main-menu";
import ChatMenu from "./chat-menu";

class Ui extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
      loginObj: {},
    };
  }

  _handleLogin(isLogin, loginObj) {
    if (isLogin !== this.state.isLogin) {
      const newLoginObj = { ...this.state.loginObj, ...loginObj, isLogin };
      const state = { ...this.state, isLogin, loginObj: newLoginObj };
      this.setState(state);
    }
  }

  render() {
    return (
      <div className="fullscreen">
        {this.state.isLogin ? (
          <ChatMenu
            value={this.state.loginObj}
            handleLogin={this._handleLogin.bind(this)}
          />
        ) : (
          <MainMenu handleLogin={this._handleLogin.bind(this)} />
        )}
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Ui />, document.getElementById("root"));
