import React, { Component } from 'react';
import logo from '../../public/pomodoro.png';

class Header extends Component {
    render() {
        return (
            <img src={logo} alt="logo" />
        );
    }
}

export default Header;
