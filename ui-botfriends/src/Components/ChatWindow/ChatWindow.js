import React, { Component } from 'react';

import './ChatWindow.css';
import axios from '../../hoc/axios';

class ChatWindow extends Component {


    state = {
        userMessages: [],
        newMessage: ''
    };

    changeText = (event) => {
        this.setState({ newMessage: event.target.value });

    }
    saveMessage = (event) => {
        let messages = [...this.state.userMessages];
        if (this.state.newMessage != '') {
            axios.post('/chat/message', { 'msg': this.state.newMessage })
                .then((res) => {
                    if (res.status === 200) {
                        if (res.data.success == 1) {
                            messages.push({ user: true, msg: this.state.newMessage });
                            messages.push({ user: false, msg: res.data.msg });
                            this.setState({ userMessages: messages, newMessage: '' });
                        } else {
                            alert(res.data.msg);
                            this.setState({ userMessages: messages, newMessage: '' });
                        }

                    }
                    if (res.status === 400) {
                        alert(res.data.msg);
                    }
                }).catch((err) => {
                    alert('Error sending message');
                    this.setState({ userMessages: messages, newMessage: '' });
                })
        } else {
            alert('Enter a message');
            this.setState({ userMessages: messages, newMessage: '' });
        }
    }

    componentWillUpdate(prevProps) {
        if (this.props.updated !== prevProps.updated) {
            this.setState({ userMessages: [], newMessage: '' });
            this.props.updatedSettings(false);
        }
    }

    componentWillMount() {
        if (this.props.updated) {
            this.setState({ userMessages: [], newMessage: '' });
            this.props.updatedSettings(false);
        }
    }

    render() {


        return (
            <div className="main-flex">
                <div className="flex-container">
                    {this.state.userMessages.length > 0 ?
                        this.state.userMessages.map((each, i) => {
                            if (each.user === true) {
                                return <input type="button"
                                    value={each.msg}
                                    key={i}
                                    className="chat-bubble-user" />
                            } else {
                                return <input type="button"
                                    value={each.msg}
                                    key={i}
                                    className="chat-bubble-server" />
                            }
                        }) : null}
                    {/* <input type = "button"
                    value = "wefjwhekfj"
                    className = "chat-bubble-user" /> 
                    <input type = "button"
                    value = "Hi 123456789010203040weufgweilufg"
                    className = "chat-bubble-user" />
                    <input type = "button"
                    value = "Hi 123456789010203040weufgweilufg"
                    className = "chat-bubble-server" /> 
                    <input type = "button"
                    value = "Hi 123456789010203040weufgweilufg"
                    className = "chat-bubble-user" />
                    <input type = "button"
                    value = "Hi 12345678"
                    className = "chat-bubble-server" /> */}

                </div>
                <div className = "input-div">
                    <input type="text"
                        className="text-area"
                        placeholder="Type your message here"
                        value={this.state.newMessage}
                        onChange={(event) => { this.changeText(event) }} />
                    <input type="button"
                        className="send-button"
                        value="SEND"
                        onClick={(event) => this.saveMessage(event)}
                    />
                </div>
            </div>

        );
    }
}

export default ChatWindow;