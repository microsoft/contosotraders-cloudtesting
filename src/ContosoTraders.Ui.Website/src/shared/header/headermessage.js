import React from 'react';

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