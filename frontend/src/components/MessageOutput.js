import React from 'react'
import Message from './Message'

const MessageOutput = ({messages}) => {
    let index = 0;
    if (messages.length) {
        return (
            <div className="MessageOutput">
                <ul className="MessageOutput_List">
                    {messages.map(message => {
                        return (
                            <li key={index++} className="MessageOutput_Item">
                                <Message {...message}/>
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    } else {
        return (
            <div className="MessageOutput"></div>
        );
    }
};

export default MessageOutput;
