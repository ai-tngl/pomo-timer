"use client";
import React, { useState, useEffect, useRef } from "react";
import TimerDisplay from "./components/TimerDisplay";
import Controls from "./components/Controls";

export default function Home() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);


  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);

  const minutesRef = useRef(minutes);
  const secondsRef = useRef(seconds);
  const intervalRef = useRef(null);

  useEffect(() => {
    minutesRef.current = minutes;
  }, [minutes]);
  useEffect(() => {
    secondsRef.current = seconds;
  }, [seconds]);

  const handleStart = () => {
    if (minutesRef.current > 0 || secondsRef.current > 0) {
      setIsRunning(true);
    }
  };

  const handlePause = () => setIsRunning(false);

  const handleReset = () => {
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
    minutesRef.current = Number(inputMinutes) || 0;
    secondsRef.current = Number(inputSeconds) || 0;
  };

  const handleSetTimer = () => {
    const m = Math.max(0, Number(inputMinutes) || 0);
    let s = Math.max(0, Number(inputSeconds) || 0);
    if (s > 59) s = 59;
    setMinutes(m);
    setSeconds(s);
    minutesRef.current = m;
    secondsRef.current = s;
    setIsRunning(false);
  };

  useEffect(() => {
    if (!isRunning) {
    
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      let curMin = minutesRef.current;
      let curSec = secondsRef.current;

      if (curMin === 0 && curSec === 0) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsRunning(false);

        setMinutes(0);
        setSeconds(0);
        minutesRef.current = 0;
        secondsRef.current = 0;
        return;
      }

      if (curSec === 0) {
        curMin = Math.max(0, curMin - 1);
        curSec = 59;
      } else {
        curSec = curSec - 1;
      }

      minutesRef.current = curMin;
      secondsRef.current = curSec;
      setMinutes(curMin);
      setSeconds(curSec);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning]);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-200 to-pink-100">
      <main className="flex flex-col items-center bg-red-300 bg-opacity-80 p-8 rounded-lg shadow-lg">
        <div className="w-full max-w-3xl">
          <h1 className="py-2 text-right text-2xl font-bold font-serif text-white mb-6">POMODORO ⏰</h1>

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
