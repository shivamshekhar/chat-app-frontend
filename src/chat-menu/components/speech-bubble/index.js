import React from 'react';
import "./index.css";

export default class SpeechBubble extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const isFriend = this.props.isFriend;
        let className = "speech-bubble-div";

        if(isFriend) {
            className += " speech-bubble-div-friend";
        } else {
            className += " speech-bubble-div-self";
        }

        return (
            <div className={className}>
                {this.props.message}
            </div>
        );
    }
}