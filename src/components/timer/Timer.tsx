import './timer.css'

export default function Timer({timeLeft}: {timeLeft: number}) {
    return (
    <h2 className='timer-text'>{`Time remaining: ${timeLeft}`}</h2>
    );
}