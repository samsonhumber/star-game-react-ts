import { ReactNode } from "react";
import Star from "../star/Star";

interface StarAreaPropsType {
    nonPlayingUI: ReactNode;
    numStars: number;
    isPlaying: boolean;
}

export default function StarArea(props: StarAreaPropsType) {
    if (props.isPlaying) {
        return (
            <div className="game-box">
                {Array.from({length: props.numStars}, (v, i) => {return i+1}).map((starNum) => {return <Star key={starNum}/>})}
            </div>
        );
    } else {
        return (
            <div className="game-box">
                {props.nonPlayingUI}
            </div>
        )

    }  
}
    