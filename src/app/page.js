"use client";
import react, { useState, useEffect} from 'react';
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';

export default function Home() {

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s === 0) {
          setMinutes((m) => (m === 0 ? 0 : m -1));
          return 59;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setMinutes(0);
  };

  return (
    <div>
      <h1>Pomo Timer</h1>
      <TimerDisplay minutes={minutes} seconds={seconds} />
      <Controls
        isRunning={isRunning}
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
        />
    </div>
  );
    

}
