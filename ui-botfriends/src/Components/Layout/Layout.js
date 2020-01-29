import React, {Component} from 'react';

import './Layout.css';
import Modal from '../Modal/Modal';
import Settings from '../Settings/Settings';
import ChatWindow from '../ChatWindow/ChatWindow';


class Layout extends Component{

    state = {
        settings : false,
        updated : false
    };

    changeSettings = () =>{
        this.setState({settings : true});
    };

    closeModal = () =>{
        this.setState({settings : false});
    };

    updatedSettings = (val) =>{
        console.log(val);
        this.setState({updated : val});
    };

    render(){
        return (
            <div>
                <div className= "menu-bar">
                    
                    <input type = "button" className= "nav-buttons" value = "Settings" onClick = {this.changeSettings}/>
                    
                </div>

                <div className="chat-window-area">
                    {this.state.settings ? 
                    <div> 
                        <Modal closeModal = {this.closeModal} />
                        <Settings closeModal = {this.closeModal} updatedSettings = {this.updatedSettings}/>
                    </div> : null}
                    <ChatWindow updatedSettings = {this.updatedSettings} updated = {this.state.updated}/>
                </div>
            </div>
        )
    }

}

export default Layout