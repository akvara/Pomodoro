import React, { Component } from 'react';
import CONFIG from '../config.js';


class Timer extends Component {

	constructor(props, context) {
	    super(props, context);

	    this.state = this.initialState();
	}

	initialState() {
		return {
	    	status: CONFIG.stopped.name,
			mins: CONFIG.work.duration,
			secs: 0,
			showStatus: true,
			running: false,
			paused: false
	    }
	}

	start() {
		this.setState({ status: CONFIG.work.name, running: true, paused: false});
		this.runTimer();

		console.log('Started.');
	}

	resume() {
		clearInterval(this.blinkInterval);
		this.setState({ running: true, paused: false, showStatus: true });
		this.runTimer();

		console.log('Resumed.');
	}

	runTimer() {
		this.interval = setInterval(function() {
			this.tick();
			if (this.isTimeUp()) {
				this.changeStatus();
				if (this.state.status === CONFIG.work.name) {
					this.showMessage(CONFIG.work.alert);
				} else {
					this.showMessage(CONFIG.rest.alert);
				}
			}
		}.bind(this), 1000);
	}

	runBlinkTimer() {
		this.blinkInterval = setInterval(function() {
			this.blink();
		}.bind(this), 600);
	}

	pause() {
		clearInterval(this.interval);
		this.setState({ running: false, paused: true });
		this.runBlinkTimer();

		console.log('Paused.');
	}

	finish() {
		this.setState({ running: false, paused: false });
		this.setState(this.initialState());
		clearInterval(this.interval);
		clearInterval(this.blinkInterval);

		console.log('Finished.');
	}

	changeStatus() {
		console.log('Changing status.');
		var coll = CONFIG.work;
		if (this.state.status === CONFIG.work.name) {
			coll = CONFIG.rest;
		}

		this.setState({
			status: coll.name,
			mins: coll.duration
		});
	}

	isTimeUp() {
		return this.state.mins <= 0 && this.state.secs <= 0;
	}

	tick() {
		var mins = this.state.mins;
		var secs = this.state.secs - 1;
		if (secs < 0) {
			secs = 59;
			mins--
		}

		this.setState({ mins, secs })
	}

	blink() {
		this.setState({ showStatus: !this.state.showStatus })
	}

	reset() {
		this.setState(this.initialState());
	}

	formatTime() {
		let padToTwo = number => ("0"+number).slice(-2);
		return this.state.mins + ":" + padToTwo(this.state.secs);
	}

	buttonStart() {
		if (this.state.running || this.state.paused) return null;

		return <button className="btn btn-lg" ref="start" onClick={this.start.bind(this)}>
			<span className="glyphicon glyphicon-play" aria-hidden="true"></span>
		</button>
	}

	buttonPause() {
		if (!this.state.running) return null;
		return <button className="btn btn-lg" ref="pause" onClick={this.pause.bind(this)}>
			<span className="glyphicon glyphicon-pause" aria-hidden="true"></span>
		</button>
	}

	buttonResume() {
		if (this.state.running || !this.state.paused ) return null;
		return <button className="btn btn-lg" ref="resume" onClick={this.resume.bind(this)}>
			<span className="glyphicon glyphicon-play" aria-hidden="true"></span>
		</button>
	}

	buttonStop() {
		if (!this.state.running && !this.state.paused) return null;

		return <button className="btn btn-lg" ref="stop" onClick={this.finish.bind(this)}>
			<span className="glyphicon glyphicon-stop" aria-hidden="true"></span>
		</button>
	}

	displayStatus() {
		return this.state.showStatus ? this.state.status : null;
	}

	showMessage() {
		if (this.state.status === CONFIG.work.name) {
			alert(CONFIG.rest.alert);
		} else {
			alert(CONFIG.work.alert);
		}
	}

	render() {
		return (
			<div className="center-block center">
				<h1>Dabar <strong>{this.displayStatus()}</strong></h1>
				<h1>Liko <strong>{this.formatTime()}</strong></h1>
				<br />
				{ this.buttonStart() }
				{ this.buttonPause() }
				{ this.buttonResume() }
				&nbsp;
				{ this.buttonStop() }
			</div>
		);
	}
}

export default Timer;
