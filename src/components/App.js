import React, { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowAltCircleUp,
  faArrowAltCircleDown
} from "@fortawesome/free-solid-svg-icons";
import { secondsToTime } from "../helpers";
import "../css/App.css";
import sound from "../audio/beep1.mp3";

library.add(faArrowAltCircleUp);
library.add(faArrowAltCircleDown);

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [currentTimerLabel, setCurrentTimerLabel] = useState("Session");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [seconds, setSeconds] = useState(25 * 60);

  const resetTimer = () => {
    setBreakLength(5);
    setSessionLength(25);
    setCurrentTimerLabel("Session");
    setSeconds(25 * 60);
    setIsTimerRunning(false);
    stopAudio();
  };

  const decrement = (currentLength, setLength, label) => {
    if (currentLength > 1) {
      setLength(currentLength - 1);
      setSecondsWhenStopped(currentLength - 1, label);
    }
  };

  const increment = (currentLength, setLength, label) => {
    if (currentLength < 60) {
      setLength(currentLength + 1);
      setSecondsWhenStopped(currentLength + 1, label);
    }
  };

  const setSecondsWhenStopped = (currentLength, label) => {
    if (!isTimerRunning) {
      if (label === currentTimerLabel) {
        setSeconds(currentLength * 60);
      }
    }
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const switchTimer = () => {
    setSeconds(
      currentTimerLabel === "Session" ? breakLength * 60 : sessionLength * 60
    );
    setCurrentTimerLabel(currentTimerLabel === "Session" ? "Break" : "Session");
  };

  const playAudio = () => {
    document.getElementById("beep").play();
  };

  const stopAudio = () => {
    const audio = document.getElementById("beep");
    audio.currentTime = 0;
    audio.pause();
  };

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      if (seconds === 0) {
        playAudio();
        switchTimer();
      }
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (!isTimerRunning && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, seconds]);

  const currentTime = secondsToTime(seconds);
  return (
    <div className="app-container">
      <div className="break-container">
        <label id="break-label">Break Length</label>
        <div id="break-length">{breakLength}</div>
        <button
          id="break-decrement"
          onClick={() => decrement(breakLength, setBreakLength, "Break")}
        >
          Decrement
        </button>
        <button
          id="break-increment"
          onClick={() => increment(breakLength, setBreakLength, "Break")}
        >
          Increment
        </button>
      </div>

      <div className="session-container">
        <label id="session-label">Session Length</label>
        <div id="session-length">{sessionLength}</div>
        <button
          id="session-decrement"
          onClick={() => decrement(sessionLength, setSessionLength, "Session")}
        >
          Decrement
        </button>
        <button
          id="session-increment"
          onClick={() => increment(sessionLength, setSessionLength, "Session")}
        >
          Increment
        </button>
      </div>

      <div className="timer-container">
        <label id="timer-label">{currentTimerLabel}</label>
        <div id="time-left">
          {currentTime.minutes + ":" + currentTime.seconds}
        </div>
        <button id="start_stop" onClick={toggleTimer}>
          {isTimerRunning ? "Pause" : "Start"}
        </button>
        <button id="reset" onClick={resetTimer}>
          Reset
        </button>
        <audio id="beep" src={sound} />
      </div>
    </div>
  );
}

export default App;
