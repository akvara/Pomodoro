import React, { Component } from "react";
import logo from "../assets/pomodoro.png";

class Header extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      visible: false,
      muted: false,
      work: window.CONFIG.work.duration,
      rest: window.CONFIG.rest.duration,
    };
  }

  toggleVisibility() {
    this.setState({ visible: !this.state.visible });
  }

  toggleMute() {
    window.CONFIG.muted = !this.state.muted;
    this.setState({ muted: !this.state.muted });
  }

  updateConfigValue(which) {
    window.CONFIG[which].duration = this.state[which];
  }

  minus(which) {
    var newValue = {};

    if (this.state[which] > 10) {
      newValue[which] = this.state[which] - 5;
    } else if (this.state[which] > 1) {
      newValue[which] = this.state[which] - 1;
    }
    this.setState(newValue, this.updateConfigValue.bind(this, which));
  }

  plus(which) {
    var newValue = {};

    if (this.state[which] >= 10) {
      newValue[which] = this.state[which] + 5;
    } else {
      newValue[which] = this.state[which] + 1;
    }
    this.setState(newValue, this.updateConfigValue.bind(this, which));
  }

  buttonMinus(which) {
    return (
      <button
        className="btn btn-sm"
        aria-label={"Mažiau: " + window.CONFIG[which].name}
        onClick={this.minus.bind(this, which)}
      >
        <span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
      </button>
    );
  }

  buttonPlus(which) {
    return (
      <button
        className="btn btn-sm"
        aria-label={"Daugiau: " + window.CONFIG[which].name}
        onClick={this.plus.bind(this, which)}
      >
        <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
      </button>
    );
  }

  buttonMute() {
    var muteGlyph = "glyphicon glyphicon-volume-down";
    if (this.state.muted) muteGlyph = "glyphicon glyphicon-volume-off";

    return (
      <button
        className="btn btn-sm"
        aria-label="Be garso"
        aria-pressed={this.state.muted}
        onClick={this.toggleMute.bind(this)}
      >
        <span className={muteGlyph} aria-hidden="true"></span>
      </button>
    );
  }

  settingButton(which) {
    return (
      <h3>
        {this.buttonMinus(which)}
        &nbsp;
        {this.state[which]}
        &nbsp;
        {this.buttonPlus(which)}
        &nbsp;
        {window.CONFIG[which].name}
      </h3>
    );
  }

  logoButton() {
    return (
      <button
        className="logo-button"
        aria-label="Nustatymai"
        aria-expanded={this.state.visible}
        title={window.CONFIG.version}
        onClick={this.toggleVisibility.bind(this)}
      >
        <img src={logo} alt="" />
      </button>
    );
  }

  render() {
    if (!this.state.visible) return <div>{this.logoButton()}</div>;

    return (
      <div>
        {this.logoButton()}
        <br />
        <small>{window.CONFIG.version}</small>
        <br />
        {this.buttonMute()}
        {this.settingButton("work")}
        {this.settingButton("rest")}
      </div>
    );
  }
}

export default Header;
