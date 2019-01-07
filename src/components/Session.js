import React from "react";

function Session(props) {
	return (
		<div className="session">
			<label id={props.details.labelId}>
				<h3>{props.timerLabel}</h3>
			</label>
			<div id={props.details.timerId}>
				<h1>
					{props.minutes}:{props.seconds}
				</h1>
			</div>
		</div>
	);
}

// Session.defaultProps = {
//     currentTimerValue
// }

export default Session;
