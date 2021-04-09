import React from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import cryptUtils from "../lib/cryptUtils";
import ChatMenu from "../chat-menu";
import LoginButton from './components/login-button';
import RegisterButton from './components/register-button';
import UserNameTextBox from './components/username-box';
import PasswordTextBox from './components/password-box';
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "../index.css";

class MainMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      message: null,
      name: null,
      password: null,
      isLoading: false,
      isLogin: false,
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

  _testApi() {
    axios.get("http://13.232.13.223/test").then(
      (data) => {
        toast(this.state.password, { type: "info" });
      },
      (err) => {
        const errorResponse = err.response;
        const errorMsg =
          (errorResponse && errorResponse.data && errorResponse.data.message) ||
          "Some error occurred!";
        toast(errorMsg, { type: "error" });
      }
    );
  }

  _login() {
    return new Promise((resolve) => {
      const userName = this.state.name;
      const password = this.state.password;
      const passwordHash = cryptUtils.convertPasswordToHash(password);
      const encryptedUserName = cryptUtils.encryptString(userName);

      axios({
        baseURL: "http://13.232.13.223",
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
        .then(() => {
          const state = { ...this.state, isLoading: false, isLogin: true };
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
    toast("Register clicked");
  }

  async _submit(evt) {
    const state = { ...this.state, isLoading: true };
    this.setState(state);
    evt.preventDefault();
    
    try {
      await this._login();
    } catch (err) {
      const errorMessage = (err && err.message) || "Some error occurred!";
      toast(errorMessage, { type: "error" });
    }
  }

  render() {
    return this.state.isLogin ? (
      <ChatMenu />
    ) : (
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
        </form>
        <RegisterButton onClick={this._register.bind(this)} />
        <ToastContainer />
      </div>
    );
  }
}

export default MainMenu;
