import React from 'react';
import "./index.css";
import "../../index.css";
import "../../../index.css";

export default class PasswordTextBox extends React.Component {
  render() {
    return (
      <React.Fragment>
        <input
          className="main-menu-text-input main-menu-password m-1"
          type="password"
          placeholder="Enter your password"
          onChange={(text) => this.props.onChange(text.target.value)}
          required
          disabled={this.props.isLoading}
        />
      </React.Fragment>
    );
  }
}
