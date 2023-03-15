export default function PlayButton({onPlay}: {onPlay: ()=>void}) {
    return (
    <>
        <button className="play-button" onClick={onPlay}>Play Again</button>
    </>
    );
}