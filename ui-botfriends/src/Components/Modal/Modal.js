import React from 'react';
import './Modal.css';

const modal =React.memo(function ({closeModal}){
    return(
        <div className = "modal" onClick = {closeModal}>
        </div>
    )
});

export default modal;
