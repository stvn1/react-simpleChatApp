import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

import './InfoBar.css';

const Infobar = ({room }) => (

    <div className="infoBar">
        <div className="leftInnerContainer">
            <img className="onlineIcone" src={onlineIcon} alt="online image" />
            <h2>{room}</h2>
        </div>
        <div className="rightInnerContainer">
            <a href="/"><img src={closeIcon} alt="close image" /></a>

        </div>
    </div>

)

export default Infobar;