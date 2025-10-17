"use client";

export default function Controls({ isRunning, onStart, onPause, onReset }) {
    return (
        <div>
            {!isRunning && (
        <button onClick={onStart}>Start</button>
    )}
            {isRunning && (
        <button onClick={onPause}>Pause</button>
    )}
        <button onClick={onReset}>Reset</button>
        </div>
    );
}   
