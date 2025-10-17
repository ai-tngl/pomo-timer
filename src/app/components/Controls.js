"use client";

export default function Controls({ isRunning, onStart, onPause, onReset }) {
    return (
        <div className="w-full flex flex-col items-center mt-6">
            {!isRunning && (
                <button
                    className="w-48 md:w-64 bg-white text-red-600 hover:text-white font-semibold py-3 rounded shadow-md hover:bg-red-500"
                    onClick={onStart}
                >
                    START
                </button>
            )}

            {isRunning && (
                <button
                    className="w-48 md:w-64 hover:bg-white hover:text-red-400 font-semibold py-3 rounded shadow-md"
                    onClick={onPause}
                >
                    PAUSE
                </button>
            )}

            <button
                className="mt-4 text-sm font-bold text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                onClick={onReset}
            >
                Reset
            </button>
        </div>
    );
}
