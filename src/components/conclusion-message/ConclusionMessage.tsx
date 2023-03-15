export default function ConclusionMessage({hasWon}: {hasWon: boolean}) {
    return (
        <h1 className="conc-message-text">{hasWon ? "You Win" : "Game Over"}</h1>
    );
}