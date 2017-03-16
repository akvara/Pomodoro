import React, { Component } from 'react';
import CONFIG from '../config.js';


class Timer extends Component {

	constructor(props, context) {
	    super(props, context);

	    this.state = this.initialState();
	    this.totalTime = 0;
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
        // this.registerAPress();

    // aIsPressed() {
    //     alert("A is pressed");
    //     $(document).off("keydown");
    // }

    // registerAPress() {
    //     $(document).on("keydown", () => this.aIsPressed() )
    // }

	start() {
		this.setState({ status: CONFIG.work.name, running: true, paused: false});
		this.runTimer();

		// console.log('Started.');
	}

	pause() {
		clearInterval(this.interval);
		this.setState({ running: false, paused: true });
		this.runBlinkTimer();

		// console.log('Paused.');
	}

	resume() {
		clearInterval(this.blinkInterval);
		this.setState({ running: true, paused: false, showStatus: true });
		this.runTimer();

		// console.log('Resumed.');
	}

	finish(endOfDay) {
		this.setState({ running: false, paused: false });
		this.setState(this.initialState());
		clearInterval(this.interval);
		clearInterval(this.blinkInterval);
		if (endOfDay) alert("End of working day!");


		// console.log('Finished.');
	}

	runTimer() {
		this.interval = setInterval(function() {
			this.tick();
			this.checkIfEnding();
			if (this.isTimeUp()) {
				this.changeStatus();
				this.alertFinished();
			}
		}.bind(this), 1000);
	}

	runBlinkTimer() {
		this.blinkInterval = setInterval(function() {
			this.blink();
		}.bind(this), 600);
	}

	changeStatus() {
		if (this.totalTime >= CONFIG.maxTotalTime) this.finish(true);

		var coll = CONFIG.work;
		if (this.state.status === CONFIG.work.name) {
			coll = CONFIG.rest;
		}

		this.totalTime += coll.duration;

		this.setState({
			status: coll.name,
			mins: coll.duration
		});

		// console.log('Changing status.');
	}

	isTimeUp() {
		return this.state.mins <= 0 && this.state.secs <= 0;
	}

	checkIfEnding() {
		if (this.state.mins === 0 && this.state.secs < 5)
			this.playSound("beep");
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

	minus() {
		if (this.state.mins > 5) {
			this.setState({mins: this.state.mins - 5});
		} else if (this.state.mins > 1) {
			this.setState({mins: this.state.mins - 1});
		}
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

	buttonMinus() {
		if (this.state.running || this.state.paused ) return null;

		return <button className="btn btn-lg" ref="minus" onClick={this.minus.bind(this)}>
			<span className="glyphicon glyphicon-minus" aria-hidden="true"></span>
		</button>
	}

	displayStatus() {
		return this.state.showStatus ? this.state.status : null;
	}

    playSound(soundId) {
		var sound = document.getElementById(soundId);
        sound.play()
    }

	alertFinished() {
      	if (this.state.status === CONFIG.work.name) {
      		this.playSound('rest');
			// alert(CONFIG.rest.alert);
		} else {
      		this.playSound('work');
			// alert(CONFIG.work.alert);
		}
	}

	render() {
		return (
			<div className="center-block center">
				<h1>Dabar <strong>{this.displayStatus()}</strong></h1>
				<h1>Liko <strong>{this.formatTime()}</strong>&nbsp;{ this.buttonMinus() }</h1>
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
