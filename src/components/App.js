import React, { useState } from "react";
import Counter from "./Counter";
import Session from "./Session";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
	faArrowAltCircleUp,
	faArrowAltCircleDown
} from "@fortawesome/free-solid-svg-icons";
import { secondsToTime } from "../helpers";
import "../css/App.css";

library.add(faArrowAltCircleUp);
library.add(faArrowAltCircleDown);

function App() {
	const [timerLabel, setTimerLabel] = useState("Session");
	const [breakValue, setBreakValue] = useState(5);
	const [sessionValue, setSessionValue] = useState(25);
	const [isTimerRunning, setIsTimerRunning] = useState(false);
	const [minutes, setMinutes] = useState(25);
	const [seconds, setSeconds] = useState("00");
	const [countDownInterval, setCountDownInterval] = useState(0);
	let secondsRemaining = 1500;
	let intervalId;
	// let timerLabel = "Session";

	const breakLength = {
		labelId: "break-label",
		description: "Break Length",
		countId: "break-length",
		incId: "break-increment",
		decId: "break-decrement"
	};
	const sessionLength = {
		labelId: "session-label",
		description: "Session Length",
		countId: "session-length",
		incId: "session-increment",
		decId: "session-decrement"
	};

	const session = {
		labelId: "timer-label",
		timerId: "time-left"
	};

	function handleTimer() {
		if (!isTimerRunning) {
			if (minutes !== "00" && seconds !== "00")
				secondsRemaining = minutes * 60 + seconds;
			else if (minutes !== "00") secondsRemaining = minutes * 60;
			else secondsRemaining = seconds;
			intervalId = setInterval(countDown, 1000);
			setCountDownInterval(intervalId);
			setIsTimerRunning(true);
		} else {
			//stop time
			clearInterval(countDownInterval);
			setCountDownInterval(0);
			setIsTimerRunning(false);
		}
	}

	function switchTimer() {
		if (!isTimerRunning) {
			intervalId = setInterval(countDown, 1000);
			setCountDownInterval(intervalId);
			setIsTimerRunning(true);
		} else {
			clearInterval(countDownInterval);
			setCountDownInterval(0);
			setIsTimerRunning(false);
		}
	}

	function countDown() {
		const time = secondsToTime(secondsRemaining);
		setMinutes(time.minutes);
		setSeconds(time.seconds);
		if (
			(time.minutes === 0 && time.seconds === 0) ||
			(time.minutes === "00" && time.seconds === "00")
		) {
			// setTimeout(reachedZero, 1000);
			console.log("changing timer as " + time.minutes + ":" + time.seconds);

			clearInterval(countDownInterval);
			setCountDownInterval(0);
			setIsTimerRunning(false);
			handleTimerChange();
		}
		secondsRemaining--;
	}

	function handleTimerChange() {
		console.log("TIMER LABEL =" + timerLabel);

		if (timerLabel === "Session") {
			console.log("CURRENT IS SESSION");
			secondsRemaining = breakValue * 60;
			const time = secondsToTime(secondsRemaining);
			setMinutes(time.minutes);
			setSeconds(time.seconds);
			setTimerLabel("Break"); //NOT WORKING
			switchTimer();
		} else {
			secondsRemaining = sessionValue * 60;
			const time = secondsToTime(secondsRemaining);
			setMinutes(time.minutes);
			setSeconds(time.seconds);
			setTimerLabel("Session");
			switchTimer();
		}
	}

	function handleReset() {
		clearInterval(countDownInterval);
		setMinutes(25);
		setSeconds("00");
		setBreakValue(5);
	}

	return (
		<div className="app-container">
			<h2 className="app-title">Pomodoro Clock</h2>
			<Counter
				details={{ ...breakLength }}
				timerLabel={timerLabel}
				breakValue={breakValue}
				setBreakValue={setBreakValue}
				minutes={minutes}
				setMinutes={setMinutes}
				seconds={seconds}
				setSeconds={setSeconds}
				isTimerRunning={isTimerRunning}
			/>
			<Counter
				details={{ ...sessionLength }}
				timerLabel={timerLabel}
				sessionValue={sessionValue}
				setSessionValue={setSessionValue}
				minutes={minutes}
				setMinutes={setMinutes}
				seconds={seconds}
				setSeconds={setSeconds}
				isTimerRunning={isTimerRunning}
			/>
			<Session
				details={{ ...session }}
				timerLabel={timerLabel}
				minutes={minutes}
				seconds={seconds}
			/>
			<button id="start_stop" onClick={handleTimer}>
				{!isTimerRunning ? "Start" : "Stop"}
			</button>
			<button id="reset" onClick={handleReset}>
				Reset
			</button>
		</div>
	);
}

export default App;
