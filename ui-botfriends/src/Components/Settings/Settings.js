import React, {Component} from 'react';

import './Settings.css';
import CloseIcon from '../../images/close.png';
import axios from '../../hoc/axios';

class Settings extends Component{

    state = {
        webhookurl : '',
        webhooksecret : ''
    }

    changeWebhookURL = (event) =>{
        this.setState({webhookurl : event.target.value})
    };

    changeWebhookSecret = (event) =>{
        this.setState({webhooksecret : event.target.value})
    };

    saveWebhook = () =>{
        if(this.state.webhookurl.length >0  && this.state.webhooksecret.length > 0){
            var data = {
                webhookURL : this.state.webhookurl,
                webhookSecret : this.state.webhooksecret
            }
            axios.post('/webhook/details', data).then((res)=>{
                this.props.closeModal();
                this.props.updatedSettings(true);
            }).catch((err)=>{
                alert('Unable to save details. Try again')
            })

            
        } else {
            alert('Enter the webhook URL and the webhook secret')
        }
        
    }
    render(){
        return(
            <div className = "settings-window">
                <img src = {CloseIcon} 
                    alt ="cancel task" 
                    className = "close-button" 
                    onClick = {this.props.closeModal}/>
                <form className = "form-style">
                    <label> Webhook URL :</label>
                    <input type = "text" 
                        value = {this.state.webhookurl}
                        onChange = {(event)=> this.changeWebhookURL(event)}
                        className = "form-text"/> <br/>
                    <label> Webhook Secret :</label>
                    <input type = "text" 
                        value = {this.state.webhooksecret}
                        onChange = {(event)=> this.changeWebhookSecret(event)}
                        className = "form-text"/> <br/>
                    <input type = "button"
                        className = "form-button" 
                        value = "SAVE"
                        onClick = {()=> this.saveWebhook()}/>
                </form>
            </div>
        )
    }
};

export default Settings;