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
        if (minutes === 0 && s === 0) {
          clearInterval(interval);
          setIsRunning(false);
          return 0;
        }
        if (s === 0) {
          setMinutes((m) => (m > 0 ? m - 1 : 0));
          return 59;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, minutes]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setMinutes(1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-200 to-pink-100 ">
  <main className="flex flex-col items-center bg-red-300 bg-opacity-80 p-8 rounded-lg shadow-lg">
      <div className="w-full max-w-3xl">
          <h1 className="flex flex-col text-center top-4 left-6 text-3xl font-bold font-serif text-white">
            POMO TIMER 
          </h1>
          <div className="rounded-lg p-8 flex flex-col items-center">
            <TimerDisplay minutes={minutes} seconds={seconds} />
            <p className="py-4 font-semibold">Time to Focus!</p>
            <Controls
              isRunning={isRunning}
              onStart={handleStart}
              onPause={handlePause}
              onReset={handleReset}
            />
        </div>
      </div>
    </main>
    </div>
   
  );

}
