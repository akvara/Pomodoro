import React, { Component } from 'react';

require('../config.js');

class Audio extends Component {

    render() {

        return (
        	<div>
                <audio id="beep" src={window.CONFIG.beepSound}></audio>
	            <audio id="click" src={window.CONFIG.clickSound}></audio>
	            <audio id="work" src={window.CONFIG.work.sound}></audio>
                <audio id="rest" src={window.CONFIG.rest.sound}></audio>
                <audio id="end" src={window.CONFIG.endWork.sound}></audio>
            </div>
        );
    }
}

export default Audio;
