import React from 'react';
import './header.scss'

function HeaderMessage(props) {
    const { type, icon, message } = props
    return ( 
        <div className={`headerMessageDiv ${type}`}>
            <img className='icon' src={icon} alt=""/>
            <p className='message m-0'>{message}</p>
        </div> 
    );
}

export default HeaderMessage;