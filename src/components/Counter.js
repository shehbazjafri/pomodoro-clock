import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Counter(props) {
	function handleIncrement() {
		if (props.details.description === "Break Length") {
			if (props.breakValue === 60 || props.isTimerRunning === true) return;
		} else if (props.details.description === "Session Length") {
			if (props.sessionValue === 60 || props.isTimerRunning === true) return;
		}

		let incValue;

		if (props.details.description === "Session Length") {
			incValue = props.sessionValue + 1;
			props.setSessionValue(incValue);
		} else if (props.details.description === "Break Length") {
			incValue = props.breakValue + 1;
			props.setBreakValue(incValue);
		}

		if (
			props.timerLabel === "Session" &&
			props.details.description !== "Break Length"
		) {
			props.setMinutes(incValue);
		} else if (
			props.timerLabel === "Break" &&
			props.details.description !== "Session Length"
		) {
			props.setMinutes(incValue);
		}

		// props.setMinutes(props.minutes + 1);

		if (
			props.seconds !== "00" &&
			props.timerLabel === "Session" &&
			props.details.description !== "Break Length"
		) {
			props.setSeconds("00");
		} else if (
			props.seconds !== "00" &&
			props.timerLabel === "Break" &&
			props.details.description !== "Session Length"
		) {
			props.setSeconds("00");
		}
	}

	function handleDecrement() {
		if (props.details.description === "Break Length") {
			if (props.breakValue === 1 || props.isTimerRunning === true) return;
		} else if (props.details.description === "Session Length") {
			if (props.sessionValue === 1 || props.isTimerRunning === true) return;
		}

		let decValue;

		if (props.details.description === "Session Length") {
			decValue = props.sessionValue - 1;
			props.setSessionValue(decValue);
		} else if (props.details.description === "Break Length") {
			decValue = props.breakValue - 1;
			props.setBreakValue(decValue);
		}

		if (
			props.timerLabel === "Session" &&
			props.details.description !== "Break Length"
		) {
			props.setMinutes(decValue);
		} else if (
			props.timerLabel === "Break" &&
			props.details.description !== "Session Length"
		) {
			props.setMinutes(decValue);
		}

		if (
			props.seconds !== "00" &&
			props.timerLabel === "Session" &&
			props.details.description !== "Break Length"
		) {
			props.setSeconds("00");
		} else if (
			props.seconds !== "00" &&
			props.timerLabel === "Break" &&
			props.details.description !== "Session Length"
		) {
			props.setSeconds("00");
		}
	}

	return (
		<div>
			<label id={props.details.labelId}>
				<h3>{props.details.description}</h3>
			</label>
			<div id={props.details.countId}>
				<h3>
					{props.details.description === "Session Length"
						? props.sessionValue
						: props.breakValue}
				</h3>
			</div>

			<FontAwesomeIcon
				id={props.details.incId}
				icon="arrow-alt-circle-up"
				size="3x"
				onClick={handleIncrement}
			/>
			<FontAwesomeIcon
				id={props.details.decId}
				icon="arrow-alt-circle-down"
				size="3x"
				onClick={handleDecrement}
			/>
		</div>
	);
}

export default Counter;
