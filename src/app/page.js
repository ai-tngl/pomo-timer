"use client";
import react, { useState, useEffect} from 'react';
import TimerDisplay from './components/TimerDisplay';
import Controls from './components/Controls';

export default function Home() {

  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const [inputMinutes,setInputMinutes] = useState(0);
  const [inputSeconds,setInputSeconds] = useState(0);

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
          setMinutes((m) => (m > 0 ? m - 1: 0));
          return 59;
        }
        return s - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleSetTimer = () => {
    setMinutes(inputMinutes);
    setSeconds(inputSeconds);
    setIsRunning(false);
  }
  const handleStart = () =>setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setMinutes(0);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-200 to-pink-100">
      <main className="flex flex-col items-center bg-red-300 bg-opacity-80 p-8 rounded-lg shadow-lg">
        <div className="w-full max-w-3xl">
          <h1 className="py-4 text-4xl text-center font-bold font-serif text-white mb-4">POMO TIMER</h1>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex flex-col items-center">
              <label className="text-sm text-white mb-1">Minutes</label>
              <input
                type="number"
                min="0"
                max="999"
                value={inputMinutes}
                onChange={(e) => setInputMinutes(e.target.value)}
                disabled={isRunning}
                className="w-24 text-center rounded p-2"
              />
            </div>

            <div className="flex flex-col items-center">
              <label className="text-sm text-white mb-1">Seconds</label>
              <input
                type="number"
                min="0"
                max="59"
                value={inputSeconds}
                onChange={(e) => setInputSeconds(e.target.value)}
                disabled={isRunning}
                className="w-24 text-center rounded p-2"
              />
            </div>

            <button
              onClick={handleSetTimer}
              className="px-4 py-2 bg-white text-red-600 rounded shadow text-sm hover:bg-red-500 hover:text-white"
            >
              Set Timer
            </button>
          </div>

          <div className="rounded-lg p-8 flex flex-col items-center bg-white/10">
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
