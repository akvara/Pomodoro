import React, { Component } from 'react';
import logo from '../../public/pomodoro.png';
import CONFIG from '../config.js';

class Header extends Component {
    render() {
        return (
        	<div>
	            <img src={logo} alt="logo" />
	            <audio id="beep" src={CONFIG.beepSound}></audio>
	            <audio id="work" src={CONFIG.work.sound}></audio>
                <audio id="rest" src={CONFIG.rest.sound}></audio>
                <audio id="end" src={CONFIG.endWork.sound}></audio>
            </div>
        );
    }
}

export default Header;
