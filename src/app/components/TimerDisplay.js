
export default function TimerDisplay({ minutes, seconds }) {
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return (
        <div className="border p-6 w-full flex flex-col items-center py-6">
            <div className="text-7xl md:text-8xl font-extrabold font-mono text-white tracking-tight">
                {formattedMinutes}:{formattedSeconds}
            </div>
        </div>
    );
}
