import { ReactNode } from 'react';

interface GameAreaPropsType {
    leftSide: ReactNode;
    rightSide: ReactNode;
}

export default function GameArea(props: GameAreaPropsType) {
    return (
    <div className="game-area-region">
        {props.leftSide} {props.rightSide}
    </div>
    );
}