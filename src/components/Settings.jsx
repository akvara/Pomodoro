import React, { Component } from 'react';
import logo from '../../public/pomodoro.png';

class Header extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            visible: false,
            muted: false,

                'work': window.CONFIG.work.duration,
                'rest': window.CONFIG.rest.duration
        }
    }

    toggleVisibility() {
        this.setState({ visible: !this.state.visible })
    }

    toggleMute() {
        window.CONFIG.muted = !this.state.muted;
        this.setState({ muted: !this.state.muted })
    }

    updateConfigValue(which) {
        window.CONFIG[which].duration = this.state[which];
    }

    minus(which) {
        var newValue = {};

        if (this.state[which] > 10) {
            newValue[which] = this.state[which] - 10;
        } else if (this.state[which] > 1) {
            newValue[which] = this.state[which] - 1;
        }
        this.setState(newValue, this.updateConfigValue.bind(this, which));
    }

    plus(which) {
        var newValue = {};

        if (this.state[which] >= 10) {
            newValue[which] = this.state[which] + 10;
        } else {
            newValue[which] = this.state[which] + 1;
        }
        this.setState(newValue, this.updateConfigValue.bind(this, which));
    }

    buttonMinus(which) {
        return <button className="btn btn-lg" ref="minus" onClick={this.minus.bind(this, which)}>
            <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
        </button>
    }

    buttonPlus(which) {
        return <button className="btn btn-lg" ref="plus" onClick={this.plus.bind(this, which)}>
            <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
        </button>
    }

    buttonMute() {
        var muteGlyph = "glyphicon glyphicon-volume-down";
        if (this.state.muted) muteGlyph = "glyphicon glyphicon-volume-off";

        return <button className="btn btn-lg" ref="mute" onClick={this.toggleMute.bind(this)}>
            <span className={muteGlyph} aria-hidden="true"></span>
        </button>
    }

    settingButton(which) {
        return <h2>
            { this.buttonMinus(which) }
            &nbsp;
            { this.state[which] }
            &nbsp;
            { this.buttonPlus(which) }
            &nbsp;
            { window.CONFIG[which].name}
        </h2>
    }

    render() {

        if (!this.state.visible) return (
            <div>
                <img src={logo} alt="logo" onClick={this.toggleVisibility.bind(this)} />
            </div>
        );

        return (
            <div>
                <img src={logo} alt="logo" onClick={this.toggleVisibility.bind(this)} />
                <br />
                { this.buttonMute() }
                { this.settingButton('work') }
                { this.settingButton('rest') }
            </div>

        );

    }
}

export default Header;
