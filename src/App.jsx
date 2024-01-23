import { useEffect, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaArrowUpLong,
  FaArrowDownLong,
} from "react-icons/fa6";
import { LuTimerReset } from "react-icons/lu";

import "./App.css";

function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(null);
  const [breakSession, setBreakSession] = useState(5);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    if (!play) return;
    let intervalId = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [seconds, minutes, play]);

  const resetTimer = () => {
    setPlay(false);
    setMinutes(25);
    setSeconds(null);
  };

  return (
    <div className="container">
      <h1>25 + 5 Clock</h1>
      <div className="selected-session">
        <div>
          <h3>Break Length</h3>
          <button className="display-btn" disabled={play}>
            <FaArrowUpLong
              className="btn-icon"
              onClick={() =>
                setBreakSession((prev) =>
                  breakSession === 60 ? breakSession : prev + 1
                )
              }
            />
          </button>
          <span>{breakSession}</span>
          <button className="display-btn" disabled={play}>
            <FaArrowDownLong
              className="btn-icon"
              onClick={() =>
                setBreakSession((prev) =>
                  breakSession === 1 ? breakSession : prev - 1
                )
              }
            />
          </button>
        </div>
        <div>
          <h3>Session Length</h3>
          <button className="display-btn" disabled={play}>
            <FaArrowUpLong
              className="btn-icon"
              onClick={() =>
                setMinutes((prev) => (minutes === 60 ? minutes : prev + 1))
              }
            />
          </button>
          <span>{minutes}</span>
          <button className="display-btn" disabled={play}>
            <FaArrowDownLong
              className="btn-icon"
              onClick={() =>
                setMinutes((prev) => (minutes === 1 ? minutes : prev - 1))
              }
            />
          </button>
        </div>
      </div>
      <div className="session-container">
        <div className="session-clock">
          <h2>Session</h2>
          <span>{!minutes ? "00" : String(minutes).padStart(2, "0")} : </span>
          <span>{!seconds ? "00" : String(seconds).padStart(2, "0")}</span>
        </div>
        <div className="display-btns">
          <button className="display-btn" onClick={() => setPlay(true)}>
            <FaPlay className="btn-icon" />
          </button>
          <button className="display-btn" onClick={() => setPlay(false)}>
            <FaPause className="btn-icon" />
          </button>
          <button className="display-btn" onClick={resetTimer}>
            <LuTimerReset className="btn-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;