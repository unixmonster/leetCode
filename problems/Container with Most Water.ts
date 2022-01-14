
// Needed to make vscode not bitch about reassigning values.
export { };


function maxArea(height: number[]): number {

    let maxArea = 0;

    for (let index = 0; index < height.length; index++) {

        let leftIndex = index;
        let leftHeight = height[index];

        for (let rightIndex = height.length - 1; rightIndex > index; rightIndex--) {
            let rightHeight = height[rightIndex];

            let maxHeight = Math.min(leftHeight, rightHeight);
            let maxWidth = Math.abs(rightIndex - leftIndex);

            let area = maxWidth * maxHeight;

            if (area > maxArea) {
                maxArea = area;
            }
            //console.log(`${leftIndex}, ${leftHeight}, ${rightIndex}, ${rightHeight}`);
        }

    }

    return maxArea;
};

let seed: number[] = [1, 8, 6, 2, 5, 4, 8, 3, 7];

import config from './test.json';

console.log(`${config.length}`)

let solution: number = maxArea(seed);

console.log(`solution: ${solution}`);
