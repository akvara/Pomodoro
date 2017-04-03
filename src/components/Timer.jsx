import React, { Component } from 'react';
import $ from 'jquery';

class Timer extends Component {

	constructor(props, context) {
	    super(props, context);

	    this.state = this.initialState();
	    this.totalTime = 0;

	    console.log(process.env.NODE_ENV, window.CONFIG.version);
	}

	initialState() {
		return {
	    	status: window.CONFIG.stopped.name,
			mins: window.CONFIG.work.duration,
			secs: 0,
			showStatus: true,
			running: false,
			paused: false
	    }
	}

    isSpacebarPressed(e) {
        if (String.fromCharCode(e.which)===' ') {
	        if (this.state.paused) this.resume();
	        else if (this.state.running) this.pause();
	    }

    }

    registerSpacebarPress() {
        $(document).on("keydown", (e) => this.isSpacebarPressed(e) )
    }

	start() {
   		this.playSound('click');
		this.setState({
			status: window.CONFIG.work.name,
			mins: window.CONFIG.work.duration,
			running: true,
			paused: false
		});
		this.runTimer();
    	this.registerSpacebarPress();

		// console.log('Started.');
	}

	pause() {
   		this.playSound('click');
		clearInterval(this.interval);
		this.setState({ running: false, paused: true });
		this.runBlinkTimer();

		// console.log('Paused.');
	}

	resume() {
   		this.playSound('click');
		clearInterval(this.blinkInterval);
		this.setState({ running: true, paused: false, showStatus: true });
		this.runTimer();

		// console.log('Resumed.');
	}

	stop() {
   		this.playSound('click');
		clearInterval(this.interval);
		clearInterval(this.blinkInterval);
		this.setState(this.initialState());
        $(document).off("keydown");

		// console.log('Finished.');
	}

	endWork() {
		this.playSound('end');
		clearInterval(this.interval);
		clearInterval(this.blinkInterval);
		console.log('EOD.');
        $(document).off("keydown");

		// alert("End of working day!");
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
		var coll = window.CONFIG.work;
		if (this.state.status === window.CONFIG.work.name) {
			coll = window.CONFIG.rest;
		}
		this.totalTime += coll.duration;


		this.setState({
			status: coll.name,
			mins: coll.duration
		});

		if (this.totalTime >= window.CONFIG.maxTotalTime) this.endWork();
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

		return <button className="btn btn-lg" ref="stop" onClick={this.stop.bind(this)}>
			<span className="glyphicon glyphicon-stop" aria-hidden="true"></span>
		</button>
	}

	displayStatus() {
		return this.state.showStatus ? this.state.status : null;
	}

    playSound(soundId) {
    	if (!window.CONFIG.muted) {
			var sound = document.getElementById(soundId);
	        sound.play()
    	}
    }

	alertFinished() {
      	if (this.state.status === window.CONFIG.work.name) {
      		this.playSound('rest');
		} else {
      		this.playSound('work');
		}
	}

	render() {
		if (this.totalTime >= window.CONFIG.maxTotalTime) {
			document.title = window.CONFIG.endWork.name;
			return <div className="center-block center"><h1>{window.CONFIG.endWork.name}</h1></div>
		}

		document.title = "Pomodoro" + (this.displayStatus() ? " - " + this.displayStatus() : "");

		return (
			<div>
				<h1>Dabar <strong>{this.displayStatus()}</strong></h1>
				<h1>Liko <strong>{this.formatTime()}</strong></h1>
				<br />
				{ this.buttonStart() }
				{ this.buttonPause() }
				{ this.buttonResume() }
				&nbsp;&nbsp;
				{ this.buttonStop() }
			</div>
		);
	}
}

export default Timer;
