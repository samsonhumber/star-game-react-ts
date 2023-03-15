import {numKeyStatusType} from '../../App';

interface NumberKeyPropsType {
    value: number;
    status: numKeyStatusType["status"];
    onNumKeyClick: (id: number) => void
}


export default function NumberKey(props: NumberKeyPropsType) {
    let colourClass: string;
    switch (props.status) {
        case 'notPicked':
            colourClass = 'not-picked';
            break;
        case 'pickedLessThanTarget':
            colourClass = 'picked-less-total';
            break;
        case 'pickedMoreThanTarget':
            colourClass = 'picked-more-total';
            break;
        case 'pickedLocked':
            colourClass = 'picked-locked';
            break;
        default:
            colourClass = 'disabled';
    } 
    return (
        <button className={'number-key-button ' + colourClass} onClick={()=>{props.onNumKeyClick(props.value)}}>{props.value}</button>
    );
}