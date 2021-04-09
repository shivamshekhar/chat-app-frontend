import React from 'react';
import "./index.css";
import "../../../index.css";

export default class MessageInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="message-input-div">
                <form className="message-input-form" onSubmit={(evt) => {this.props.onSubmit(evt)}}>
                    <input type="text" className="message-input-box" placeholder="Type a message" onChange={(text) => this.props.onChange(text)}/>
                    <input type="submit" className="message-sent-button chat-app-button-default" value="Send" />
                </form>
            </div>
        );
    }
}