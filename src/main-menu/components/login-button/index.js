import React from 'react';
import "./index.css";
import "../../index.css";
import "../../../index.css";

export default class LoginButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <button
          type="submit"
          className="main-menu-button login-button m-2 chat-app-button-default"
          name="login"
          disabled={this.props.isLoading}
        >
          {this.props.isLoading ? "..." : "Login"}
        </button>
      </React.Fragment>
    );
  }
}
