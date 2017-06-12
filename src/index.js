import React from 'react';
import ReactDOM from 'react-dom';
import Audio from './components/Audio';
import App from './components/App';

window.onbeforeunload = function() {
   return "Do you really want to leave Pomodoro app?";
   //if we return nothing here (just calling return;) then there will be no pop-up question at all
   //return;
};

ReactDOM.render(<Audio/>, document.getElementById('audio'));
ReactDOM.render(<App/>, document.getElementById('app'));
