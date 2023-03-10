import { useState, useEffect } from "react";
import "./App.css";
import Button from "./Components/Button";
import getPadTime from "./helpers/getPadTime";

function App() {
  const [timeLeft, setTimeLeft] = useState(0),
    [isCounting, setIsCounting] = useState(false),
    [fullTime, setFullTime] = useState(120),
    [wight, setWight] = useState(100),
    [step, setStep] = useState(1000);

  const minutes = getPadTime(Math.floor(timeLeft / 60)),
    seconds = getPadTime(timeLeft - minutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      isCounting &&
        setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0));
    }, step);
    return () => {
      clearInterval(interval);
    };
  }, [isCounting, step]);

  useEffect(() => {
    setWight((wight) => (wight = (timeLeft * 100) / fullTime));
  }, [fullTime, timeLeft]);

  const handleStart = () => setIsCounting(true);
  const handleStop = () => setIsCounting(false);
  const handleReset = () => {
    setIsCounting(false);
    setTimeLeft(0);
    setWight(100);
  };

  const handelChange = (event) => {
    if (event.target.value > 60) {
      setTimeLeft(60 * 60);
      setFullTime((fullTime) => (fullTime = 60 * 60));
    } else if (event.target.value <= 0) {
      setTimeLeft(120);
      setFullTime((fullTime) => (fullTime = 120));
    } else {
      setTimeLeft(event.target.value * 60);
      setFullTime((fullTime) => (fullTime = Number(event.target.value) * 60));
    }
  };

  const takeStep = (event) => {
    event.target.value <= 0
      ? (event.target.value = 1)
      : setStep((step) => (step = event.target.value * 1000));
  };

  return (
    <div className="App">
      <div className="input-container">
        <div className="input-box">
          <label htmlFor="time"> Write time for timer in minutes </label>
          <input
            type="number"
            name="time"
            placeholder="Minutes"
            onChange={handelChange}
          />
        </div>
        <div className="input-box">
          <label htmlFor="step"> Write time for timer step in seconds </label>
          <input
            type="number"
            name="step"
            placeholder="Step"
            onChange={takeStep}
          />
        </div>
      </div>

      <div className="timer">
        <span className="timer-number">{minutes}</span>
        <span className="timer-number">:</span>
        <span className="timer-number">{seconds}</span>
      </div>
      <div className="buttons">
        {!isCounting ? (
          <Button text="Start" fixTme={handleStart} />
        ) : (
          <Button text="Stop" fixTme={handleStop} />
        )}
        <Button text="Reset" fixTme={handleReset} />
      </div>
      <div
        style={{
          backgroundColor: "rgb(65, 194, 39)",
          width: `${wight}%`,
          height: "29px",
        }}
      ></div>
    </div>
  );
}

export default App;
