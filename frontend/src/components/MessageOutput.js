import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Message from './Message'

class MessageOutput extends Component {
    static propTypes = {
        messages: PropTypes.array.isRequired
    };

    componentDidUpdate() {
        this._scrollMessages();
    }

    _scrollMessages() {
        let node = ReactDOM.findDOMNode(this);
        let scrollThreshold = 420; // ~ panel height + line height
        if (node.scrollHeight - node.scrollTop <= scrollThreshold) {
            node.scrollTop = node.scrollHeight;
        }
    }

    render() {
        let messages = this.props.messages;
        let index = 0;
        if (messages.length) {
            return (
                <div className="message-panel__output" id="messageOutput">
                    <ul className="message-panel__list">
                        {messages.map(message => {
                            return (
                                <li key={index++} className="message-panel__list-item">
                                    <Message {...message}/>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            );
        } else {
            return (
                <div className="message-panel__output" id="messageOutput"></div>
            );
        }
    }
}

export default MessageOutput;
