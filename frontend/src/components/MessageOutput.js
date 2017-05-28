import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import Message from './Message'

const MESSAGE_OUTPUT_PANEL_HEIGHT = 400;

class MessageOutput extends Component {
    static propTypes = {
        messages: PropTypes.array.isRequired
    };


    constructor(props) {
        super(props);
        this.listItemIndex = 0;
    }

    componentDidUpdate() {
        this._scrollMessages();
    }

    _scrollMessages() {
        let node = ReactDOM.findDOMNode(this);
        let lastItemHeight = node.getElementsByClassName('message-panel__list-item')[this.listItemIndex - 1].scrollHeight;
        if (node.scrollHeight - node.scrollTop <= MESSAGE_OUTPUT_PANEL_HEIGHT + 1 + lastItemHeight) {
            node.scrollTop = node.scrollHeight;
        }
    }

    render() {
        this.listItemIndex = 0;
        let messages = this.props.messages;
        if (messages.length) {
            return (
                <div className="message-panel__output" id="messageOutput">
                    <ul className="message-panel__list">
                        {messages.map(message => {
                            return (
                                <li key={this.listItemIndex++} className="message-panel__list-item">
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
