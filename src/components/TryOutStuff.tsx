import React, { useReducer, useRef } from "react";

export default function TryOutStuff() {
    const [checked, setChecked] = useReducer((checked: boolean): boolean => {return !checked}, false);
    const textTitle = useRef<HTMLInputElement>(null);
    const hexColour = useRef<HTMLInputElement>(null);
    function submitt(e: React.FormEvent): void {
        e.preventDefault();
        if (textTitle.current !== null && hexColour.current !== null) {
            const title: string = textTitle.current.value;
            const colour: string = hexColour.current.value;
            console.log(title, colour);
        }
        
        
    }

    return (
    <div>
        <input aria-labelledby="checkbox-label" type='checkbox' value={checked ? 1 : 0} onChange={setChecked}/>
        <label id="checkbox-label">
            {checked ? "checked" : "not checked"}
        </label>
        <form onSubmit={submitt}>
            <input type='text' placeholder="colour title" ref={textTitle}/>
            <input type="color" ref={hexColour}/>
            <button>ADD</button>
        </form>
    </div>)
}