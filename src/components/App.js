import React, { useState } from "react";
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
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [currentTimerLabel, setCurrentTimerLabel] = useState("Session");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentTimer, setCurrentTimer] = useState(0);

  const resetTimer = () => {
    setBreakLength(5);
    setSessionLength(25);
    setCurrentTimer(secondsToTime(0));
  };

  const decrement = (currentLength, setLength) => {
    if (currentLength > 1) setLength(currentLength - 1);
  };

  const increment = (currentLength, setLength) => {
    if (currentLength < 60) setLength(currentLength + 1);
  };

  const handleTimer = () => {
    if (isTimerRunning) {
    } else {
      setCurrentTimer(secondsToTime(25 * 60));
    }
  };

  return (
    <div className="app-container">
      <div className="break-container">
        <label id="break-label">Break Length</label>
        <div id="break-length">{breakLength}</div>
        <button
          id="break-decrement"
          onClick={() => decrement(breakLength, setBreakLength)}
        >
          Decrement
        </button>
        <button
          id="break-increment"
          onClick={() => increment(breakLength, setBreakLength)}
        >
          Increment
        </button>
      </div>

      <div className="session-container">
        <label id="session-label">Session Length</label>
        <div id="session-length">{sessionLength}</div>
        <button
          id="session-decrement"
          onClick={() => decrement(sessionLength, setSessionLength)}
        >
          Decrement
        </button>
        <button
          id="session-increment"
          onClick={() => increment(sessionLength, setSessionLength)}
        >
          Increment
        </button>
      </div>

      <div className="timer-container">
        <label id="timer-label">{currentTimerLabel}</label>
        <div id="time-left">
          {currentTimer.minutes}:{currentTimer.seconds}
        </div>
        <button id="start_stop" onClick={handleTimer}>
          {isTimerRunning ? "Stop" : "Start"}
        </button>
        <button id="reset" onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default App;
