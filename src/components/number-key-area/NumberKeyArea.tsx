import { ReactNode } from "react";


export default function NumberKeyArea({children}: {children: ReactNode}) {
    return (
    <div className="game-box">
        {children}
    </div>
    );
}