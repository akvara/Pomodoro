import React, { Component } from "react";

class Timer extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = this.initialState();
    this.totalTime = 0;
    this.handleKeydown = this.isSpacebarPressed.bind(this);
    // Ask before leaving only while a day is in progress.
    this.handleBeforeUnload = (e) => e.preventDefault();

    console.log(import.meta.env.MODE, window.CONFIG.version);
  }

  initialState() {
    return {
      status: window.CONFIG.stopped.name,
      mins: window.CONFIG.work.duration,
      secs: 0,
      showStatus: true,
      running: false,
      paused: false,
    };
  }

  isSpacebarPressed(e) {
    // A focused button handles space itself; skip it here to avoid a double toggle.
    if (e.key === " " && !e.target.closest("button")) {
      e.preventDefault();
      if (this.state.paused) {
        this.resume();
      }
      else if (this.state.running) {
        this.pause();
      }
    }
  }

  registerListeners() {
    document.addEventListener("keydown", this.handleKeydown);
    window.addEventListener("beforeunload", this.handleBeforeUnload);
  }

  removeListeners() {
    document.removeEventListener("keydown", this.handleKeydown);
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
  }

  start() {
    this.playSound("click");
    this.setState({
      status: window.CONFIG.work.name,
      mins: window.CONFIG.work.duration,
      running: true,
      paused: false,
    });
    this.runTimer();
    this.registerListeners();
  }

  pause() {
    this.playSound("click");
    clearInterval(this.interval);
    this.setState({ running: false, paused: true });
    this.runBlinkTimer();
  }

  resume() {
    this.playSound("click");
    clearInterval(this.blinkInterval);
    this.setState({ running: true, paused: false, showStatus: true });
    this.runTimer();
  }

  stop() {
    this.playSound("click");
    clearInterval(this.interval);
    clearInterval(this.blinkInterval);
    this.totalTime = 0;
    this.setState(this.initialState());
    this.removeListeners();
  }

  endWork() {
    this.playSound("end");
    clearInterval(this.interval);
    clearInterval(this.blinkInterval);
    console.log("EOD.");
    this.removeListeners();
  }

  runTimer() {
    this.interval = setInterval(
      function () {
        this.tick();
      }.bind(this),
      1000,
    );
  }

  runBlinkTimer() {
    this.blinkInterval = setInterval(
      function () {
        this.blink();
      }.bind(this),
      600,
    );
  }

  changeStatus() {
    var finished = window.CONFIG.rest;
    var next = window.CONFIG.work;
    if (this.state.status === window.CONFIG.work.name) {
      finished = window.CONFIG.work;
      next = window.CONFIG.rest;
    }
    this.totalTime += finished.duration;

    this.setState({
      status: next.name,
      mins: next.duration,
      secs: 0,
    });

    if (this.totalTime >= window.CONFIG.maxTotalTime) this.endWork();
  }

  // React 19 batches setState in intervals: read this.state once, never after setState.
  tick() {
    var mins = this.state.mins;
    var secs = this.state.secs;
    if (mins <= 0 && secs <= 0) {
      this.alertFinished();
      this.changeStatus();
      return;
    }
    secs--;
    if (secs < 0) {
      secs = 59;
      mins--;
    }
    if (mins === 0 && secs < 5) this.playSound("beep");
    this.setState({ mins, secs });
  }

  blink() {
    this.setState({ showStatus: !this.state.showStatus });
  }

  formatTime() {
    let padToTwo = (number) => ("0" + number).slice(-2);
    return this.state.mins + ":" + padToTwo(this.state.secs);
  }

  buttonStart() {
    if (this.state.running || this.state.paused) return null;

    return (
      <button className="btn btn-lg" aria-label="Pradėti" onClick={this.start.bind(this)}>
        <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
      </button>
    );
  }

  buttonPause() {
    if (!this.state.running) return null;
    return (
      <button className="btn btn-lg" aria-label="Pauzė" onClick={this.pause.bind(this)}>
        <span className="glyphicon glyphicon-pause" aria-hidden="true"></span>
      </button>
    );
  }

  buttonResume() {
    if (this.state.running || !this.state.paused) return null;
    return (
      <button className="btn btn-lg" aria-label="Tęsti" onClick={this.resume.bind(this)}>
        <span className="glyphicon glyphicon-play" aria-hidden="true"></span>
      </button>
    );
  }

  buttonStop() {
    if (!this.state.running && !this.state.paused) return null;

    return (
      <button className="btn btn-lg" aria-label="Stabdyti" onClick={this.stop.bind(this)}>
        <span className="glyphicon glyphicon-stop" aria-hidden="true"></span>
      </button>
    );
  }

  displayStatus() {
    return this.state.showStatus ? this.state.status : null;
  }

  playSound(soundId) {
    if (!window.CONFIG.muted) {
      var sound = document.getElementById(soundId);
      sound.currentTime = 0;
      // play() rejects if audio is blocked (no user gesture yet) or the file fails; the timer must keep running.
      sound.play()?.catch((err) => console.warn("Sound failed:", soundId, err));
    }
  }

  alertFinished() {
    // Called before changeStatus, so status is the period that just finished.
    if (this.state.status === window.CONFIG.work.name) {
      this.playSound("work");
    } else {
      this.playSound("rest");
    }
  }

  render() {
    if (this.totalTime >= window.CONFIG.maxTotalTime) {
      document.title = window.CONFIG.endWork.name;
      return (
        <div className="center-block center">
          <h1>{window.CONFIG.endWork.name}</h1>
        </div>
      );
    }

    document.title =
      "Pomodoro" + (this.displayStatus() ? " - " + this.displayStatus() : "");

    return (
      <div>
        <h1>
          Dabar <strong>{this.displayStatus()}</strong>
        </h1>
        <h1>
          Liko <strong>{this.formatTime()}</strong>
        </h1>
        <br />
        {this.buttonStart()}
        {this.buttonPause()}
        {this.buttonResume()}
        &nbsp;&nbsp;
        {this.buttonStop()}
      </div>
    );
  }
}

export default Timer;
