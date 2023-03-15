interface combObjType {
    total: number;
    remNums: number[];
}

export default function findPossibleStarNumbers({maxStars, unPressedKeys}: {maxStars: number, unPressedKeys: number[]}): number[] {
    if (unPressedKeys.length === 0) {
        return [0]
    } else {
        const sortedKeys = [...unPressedKeys].sort((a, b) => {return a-b});

        // Find maximum number of numbers from unPressedKeys that may be summed to not exceed maxStars
        let maxSummableNumbers = 1
        let sumOfNumbers = sortedKeys[0];
        let numberIndex = 1;
        while (sumOfNumbers < maxStars && numberIndex < sortedKeys.length) {
            maxSummableNumbers++;
            sumOfNumbers += sortedKeys[numberIndex];
            numberIndex++;
        }

        // Find sums of one or more numbers to equal maxStars and return array
        let grandArr = [sortedKeys.map((value, index) => {
            return {total: value, remNums: sortedKeys.slice(0, index).concat(sortedKeys.slice(index+1))}
        })];
        for (let i=1; i<maxSummableNumbers; i++) {
            grandArr.push([]);
            for (let j=0; j<grandArr[i-1].length; j++) {
                const relevantElements: combObjType = grandArr[i-1][j];
                for (let k=0; k<relevantElements.remNums.length; k++) {
                    const newTotal = relevantElements.total + relevantElements.remNums[k];
                    if (newTotal <= maxStars) {
                        const newRemNums = relevantElements.remNums.slice(0, k).concat(relevantElements.remNums.slice(k+1));
                        grandArr[i].push({total: newTotal, remNums: newRemNums});
                    }
                }
            }
            // structure of grandArr can be [[{total: a, remNums: [b, c, d]}]]
        }
        const totals = grandArr.flatMap(subArray => subArray).map((combObj: combObjType): number => {return combObj.total});
        let uniqueTotals = new Set(totals);
        return Array.from(uniqueTotals).sort((a, b) => {return a-b});
    }
}