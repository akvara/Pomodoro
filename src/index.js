import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Timer from './components/Timer';

ReactDOM.render(<Header />, document.getElementById('header'));
ReactDOM.render(<Timer />, document.getElementById('timer'));
