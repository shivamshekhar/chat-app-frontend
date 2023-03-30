import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import cryptUtils from "../lib/cryptUtils";
import LoginButton from "./components/login-button";
import RegisterButton from "./components/register-button";
import UserNameTextBox from "./components/username-box";
import PasswordTextBox from "./components/password-box";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "../index.css";

class MainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.chatMenuObj = {
      sessionToken: null,
      userName: null,
    };

    this.state = {
      error: null,
      message: null,
      name: null,
      password: null,
      isLoading: false,
    };
  }

  _updateName(name) {
    const state = { ...this.state, name };
    this.setState(state);
  }

  _updatePassword(password) {
    const state = { ...this.state, password };
    this.setState(state);
  }

  _login() {
    return new Promise((resolve) => {
      const userName = this.state.name;
      const password = this.state.password;
      const passwordHash = cryptUtils.convertPasswordToHash(password);
      const encryptedUserName = cryptUtils.encryptString(userName);

      axios({
        baseURL: "http://localhost:4000",
        url: "/auth/user/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name: encryptedUserName,
          password: passwordHash,
        },
      })
        .then((res) => {
          this.chatMenuObj.sessionToken =
            res && res.data && res.data.sessionToken;
          this.chatMenuObj.userName = userName;

          const state = { ...this.state, isLoading: false };
          this.setState(state);
          return resolve();
        })
        .catch((err) => {
          const errorMessage =
            (err &&
              err.response &&
              err.response.data &&
              err.response.data.error) ||
            "Some error occurred!";
          toast(errorMessage, { type: "error" });
          const state = { ...this.state, isLoading: false };
          this.setState(state);
          return resolve();
        });
    });
  }

  _register() {
    return new Promise((resolve) => {
      const userName = this.state.name;
      const password = this.state.password;
      const passwordHash = cryptUtils.convertPasswordToHash(password);
      const encryptedUserName = cryptUtils.encryptString(userName);

      axios({
        baseURL: "http://localhost:4000",
        url: "/auth/user/create",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name: encryptedUserName,
          password: passwordHash,
        },
      })
        .then((res) => {
          toast("Successfully registered user", { type: "info" });
          const state = { ...this.state, isLoading: false };
          this.setState(state);
          return resolve();
        })
        .catch((err) => {
          const errorMessage =
            (err &&
              err.response &&
              err.response.data &&
              err.response.data.error) ||
            "Some error occurred!";
          toast(errorMessage, { type: "error" });
          const state = { ...this.state, isLoading: false };
          this.setState(state);
          return resolve();
        });
    });
  }

  async _submit(evt) {
    evt.preventDefault();

    const buttonPressed =
      evt &&
      evt.nativeEvent &&
      evt.nativeEvent.submitter &&
      evt.nativeEvent.submitter.name;
    const state = { ...this.state, isLoading: true };
    this.setState(state);

    if (buttonPressed === "login") {
      try {
        await this._login();
        this.props.handleLogin(true, this.chatMenuObj);
      } catch (err) {
        const errorMessage = (err && err.message) || "Some error occurred!";
        toast(errorMessage, { type: "error" });
      }
    } else if (buttonPressed === "register") {
      try {
        await this._register();
      } catch (err) {
        const errorMessage = (err && err.message) || "Some error occurred!";
        toast(errorMessage, { type: "error" });
      }
    }
  }

  render() {
    return (
      <div className="main-menu-div">
        <form onSubmit={(evt) => this._submit(evt)}>
          <span className="main-menu-title-span">Login</span>
          <UserNameTextBox
            onChange={this._updateName.bind(this)}
            isLoading={this.state.isLoading}
          />
          <PasswordTextBox
            onChange={this._updatePassword.bind(this)}
            isLoading={this.state.isLoading}
          />
          <LoginButton isLoading={this.state.isLoading} />
          <RegisterButton isLoading={this.state.isLoading} />
        </form>
        <ToastContainer />
      </div>
    );
  }
}

export default MainMenu;
