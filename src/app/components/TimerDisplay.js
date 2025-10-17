
export default function TimerDisplay({ minutes, seconds }) {
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');  

    return (
        <div>
            {formattedMinutes}:{formattedSeconds}
        </div>

    );
}
