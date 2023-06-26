import { React, useState, useEffect } from 'react';
import Break from './components/break';
import Session from './components/session';
import Timer from './components/timer';
import './App.css';

function App() {

  const [breakLength, setBreakLength] = useState(5*60);
  const [sessionLength, setSessionLength] = useState(25*60);
  const [timerType, setTimerType] = useState('Session');
  const [timeLeft, setTimeLeft] = useState();
  const [isRunning, setIsRunning] = useState(false);
  const [passedTime, setPassedTime] = useState(1000);
  const [beep] = useState(
    new Audio("https://upload.wikimedia.org/wikipedia/commons/4/47/Demo_delay.ogg")
  );
  const [beepPlay, setBeepPlay] = useState(false);
  useEffect(() => {
    setTimeLeft(timerType === "Session" ? sessionLength * 1000: breakLength * 1000);
  }, [timerType, sessionLength, breakLength]);



  function decrementBreakLength() {
    if(!isRunning) {
    const decreasedBreakLength = breakLength - 60 > 60 ? breakLength - 60 : 60;
    setBreakLength(decreasedBreakLength);
    }else {
      return;
    }
  };

  function incrementBreakLength() {
    if (!isRunning) {
    const incrementedBreakLength =
      breakLength + 60 <= 60 * 60 ? breakLength + 60 : 60 * 60;
    setBreakLength(incrementedBreakLength);
    } else {
      return;
    }
  };

  function decrementSessionLength() {
    if (!isRunning) {
    const decreasedSessionLength =
      sessionLength - 60 > 60 ? sessionLength - 60 : 60;
    setSessionLength(decreasedSessionLength);
  } else {
    return;
  }
  };

  function incrementSessionLength() {
    if (!isRunning) {
    const incrementedSessionLength =
      sessionLength + 60 <= 60 * 60 ? sessionLength + 60 : 60;
    setSessionLength(incrementedSessionLength);
  } else {
    return;
  }
  };
  function playSound() {
    return new Promise(function() {
      const audio = document.getElementById('beep');
      audio.currentTime = 0
      audio.play();
    });
  };

  function stopSound() {
    return new Promise(function() {
      const audio = document.getElementById('beep');
      audio.currentTime = 0
      audio.pause();
    });
  };

  function toggleAction() {
    setIsRunning(!isRunning);
  };

  function reset() {
    setBreakLength(5 * 60);
    setSessionLength(25 * 60);
    setTimerType('Session')
    setTimeLeft(sessionLength * 1000 );
    setBeepPlay(false);
    stopSound();
    if (isRunning) {
      setIsRunning(false);
      setPassedTime(1000);
    }
  };

  useEffect(() => {
    let interval = null;
    if (isRunning && timeLeft >= 0) {
      setTimeLeft(
        timerType === "Session"
          ? sessionLength * 1000 - passedTime
          : breakLength * 1000 - passedTime
      );
  
      interval = setInterval(() => {
        setPassedTime((passedTime) => passedTime + 1000);
      }, 1000);
    }
    if (timeLeft < 0) {
      clearInterval(interval);
      playSound();
      setBeepPlay(true);
      setPassedTime(0);
      setTimerType(timerType === "Session" ? "Break" : "Session");
      setTimeLeft(
        timerType === "Session" ? sessionLength * 1000 : breakLength * 1000
      );
    }
    return () => clearInterval(interval);
  }, [isRunning, passedTime,beep, breakLength, sessionLength, timeLeft, timerType]);



 
  useEffect(() => {
    const audio = document.getElementById('beep');
    audio.addEventListener("ended", () => setBeepPlay(false));
    return () => {
      audio.removeEventListener("ended", () => setBeepPlay(false));
    };
  }, []);


  return (
    <div className='wrapper container-fluid'>
      <div  className='container clock'>
        <div className='row header '>
          <h1 className='display-1'>25 + 5 Clock</h1>
        </div>
        <div className='row mode'>
         <Session length={sessionLength} increment={incrementSessionLength} decrement={decrementSessionLength} />
         <Break length={breakLength} increment={incrementBreakLength} decrement={decrementBreakLength} />
        </div>
        <div className='row'>
          <Timer type={timerType} time={timeLeft} beepPlay={beepPlay} />
        </div>
        <div className="row controls">
        <button className='col-5 me-auto btn btn-dark btn-lg button-control' id="start_stop" onClick={toggleAction}>{isRunning ? 'Pause' : 'Start'}
        </button>
        <button className='col-6 me-auto btn btn-dark btn-lg button-control' id="reset" onClick={reset}>
          Reset
        </button>
        <audio src='https://upload.wikimedia.org/wikipedia/commons/4/47/Demo_delay.ogg' id='beep' />
      </div>
      </div>
    </div>
  );
}

export default App;
