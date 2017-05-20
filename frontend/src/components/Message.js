import React from 'react'
import {MESSAGE_TYPE_INFO} from '../constants';

const Message = ({type, username, text, datetime, isOwn}) => {
    if (type === MESSAGE_TYPE_INFO) {
        return (
            <p className="MessageOutput_P MessageOutput_P__Own">
                <span className="MessageOutput_Text MessageOutput_Text__Info">{text}</span>
                <span className="MessageOutput_Datetime">[{datetime}]</span>
            </p>
        );
    }

    if (isOwn) {
        return (
            <p className="MessageOutput_P MessageOutput__P_Own">
                <span className="MessageOutput_Username MessageOutput_Username__Own">(me)</span>
                <span className="MessageOutput_Text">{text}</span>
                <span className="MessageOutput_Datetime">[{datetime}]</span>
            </p>
        );
    } else  {
        return (
            <p className="MessageOutput_P">
                <span className="MessageOutput_Username">{username}:</span>
                <span className="MessageOutput_Text">{text}</span>
                <span className="MessageOutput_Datetime">[{datetime}]</span>
            </p>
        );
    }
};

export default Message;
