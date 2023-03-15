import { useState, useEffect } from 'react';
import findPossibleTargets from './findPossibleTargets';

interface numKeyStatusType {
    id: number;
    status: 'notPicked' | 'pickedLessThanTarget' | 'pickedMoreThanTarget' | 'pickedLocked' | 'disabled';
}

let initialNumKeys: numKeyStatusType[] = [];  
for (let i=0; i<9; i++) {
    initialNumKeys.push({id: i+1, status: 'notPicked'});
}

export default function useNumKeys(): [number, boolean, boolean, numKeyStatusType[], number, ()=>void, (id: number)=>void, ()=>void, ()=>void] {
    // time, hasWon, isPlaying, numKeysStatus, currentTotal, targetTotal, onNewGame, onNumKeyClick, useWinEffects, useTimeEffects
    const [time, setTime] = useState<number>(20);
    const [numKeysStatus, setNumKeysStatus] = useState<numKeyStatusType[]>(initialNumKeys);
    const [currentTotal, setCurrentTotal] = useState<number>(0);
    const [targetTotal, setTargetTotal] = useState<number>(Math.ceil(9 * Math.random()));  //Math.ceil(Math.random() * 9)
    const [hasWon, setHasWon] = useState<boolean>(false);
    const [isPlaying, setIsPlaying] = useState<boolean>(true);

    function changeStatusById({changeId, newStatus}: {changeId: number, newStatus: numKeyStatusType["status"]}) {
        setNumKeysStatus(numKeysStatus.slice(0, changeId-1).concat([{id: changeId, status: newStatus}], numKeysStatus.slice(changeId)));
    }

    function changeStatusByStatus({oldStatus, newStatus, idAlsoToChange}: {oldStatus?: numKeyStatusType["status"], newStatus: numKeyStatusType["status"], idAlsoToChange?: number}) {
        let newNumKeysStatus = [...numKeysStatus];
        if (idAlsoToChange) {
            newNumKeysStatus[idAlsoToChange-1].status = newStatus;
        }
        if (oldStatus) {
            for (let i=0; i<numKeysStatus.length; i++) {
                if (numKeysStatus[i].status === oldStatus) {
                    newNumKeysStatus[i].status = newStatus;
                }
            }
        } else {
            for (let i=0; i<numKeysStatus.length; i++) {
                newNumKeysStatus[i].status = newStatus;
            }
        }
        setNumKeysStatus(newNumKeysStatus);
    }
        

    function getIdsByStatus(status: numKeyStatusType["status"]) {
        return numKeysStatus.filter((numKeyObj) => {return numKeyObj.status === status}).map((numKeyObj) => {return numKeyObj.id});
    }

    function onNewGame() {
        changeStatusByStatus({oldStatus: "disabled", newStatus: "notPicked"});
        setHasWon(false);
        setIsPlaying(true);
        setTargetTotal(Math.ceil(9 * Math.random()));
        setTime(20);
    }


    function startNewBoard() {
        const possibleTargetNumbers = findPossibleTargets({maxStars: 9, unPressedKeys: getIdsByStatus("notPicked")});
        console.log("Possible targets", possibleTargetNumbers,"where free slots are", getIdsByStatus("notPicked"));
        
        const newTarget = possibleTargetNumbers[Math.floor(Math.random()*possibleTargetNumbers.length)];
        console.log(newTarget);
        setTargetTotal(newTarget);
    }

    function onNumKeyClick(id: number) {
        console.log("pressed", id);
        if (numKeysStatus[id-1].status === 'notPicked' && currentTotal + id === targetTotal) {
            changeStatusByStatus({oldStatus: "pickedLessThanTarget", newStatus: 'pickedLocked', idAlsoToChange: id}); 
            setCurrentTotal(0);
            console.log("Numbers match target");
            startNewBoard();
        } else if (numKeysStatus[id-1].status === 'notPicked' && currentTotal + id > targetTotal) {
            changeStatusByStatus({oldStatus: "pickedLessThanTarget", newStatus: 'pickedMoreThanTarget', idAlsoToChange: id});
            setCurrentTotal(currentTotal + id);
            console.log("Numbers exceed target");
        } else if (numKeysStatus[id-1].status === 'notPicked') {
            changeStatusById({changeId: id, newStatus: "pickedLessThanTarget"});
            setCurrentTotal(currentTotal + id);
            console.log("Numbers less than target");
        } else if (numKeysStatus[id-1].status === 'pickedLessThanTarget') {
            changeStatusById({changeId: id, newStatus: "notPicked"});
            setCurrentTotal(currentTotal - id);
            console.log("Number deselected");
        } else if (numKeysStatus[id-1].status === 'pickedMoreThanTarget') {
            changeStatusByStatus({oldStatus: "pickedMoreThanTarget", newStatus: 'notPicked'});
            setCurrentTotal(0);
            console.log("Numbers deselected because exceed target");
        } else {
            console.log("Button has status", numKeysStatus[id-1].status);
        }    
    }

    function useWinEffects() {
        useEffect(() => {
            const allNumKeysAreLocked = numKeysStatus.every(
            (numKeyObj) => {return (numKeyObj.status === 'pickedLocked')}
            );
            if (allNumKeysAreLocked) {
            console.log("You win");
            setHasWon(true);
            changeStatusByStatus({newStatus: 'disabled'});
            }
        }, [numKeysStatus, hasWon]);
    }

    function useTimeEffects() {
        useEffect(() => {
            let interval: NodeJS.Timer | undefined = undefined;
            if(time > 0 && !hasWon) {
            interval = setInterval(() => {
                setTime((time) => {return (time - 1)})
            }, 1000);
            console.log(time);
            } else if (time === 0 && !hasWon) {
            console.log("Out of time");
            setIsPlaying(false);
            changeStatusByStatus({newStatus: 'disabled'});
            clearInterval(interval);
            } else {
            setIsPlaying(false);
            clearInterval(interval);
            }
            return () => clearInterval(interval);
        }, [time, hasWon, isPlaying]);
    }
    return [time, hasWon, isPlaying, numKeysStatus, targetTotal, onNewGame, onNumKeyClick, useWinEffects, useTimeEffects]
}