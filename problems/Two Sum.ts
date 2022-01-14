
// Needed to make vscode not bitch about reassigning values.
export { };

/*

Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

*/

function twoSum(nums: number[], target: number): number[] {

    /* walk through all numbers and find the pair */

    /* Finding an example for one. */
    //let left = nums[0];
    //let remaining = target - left;
    //let paired = nums.indexOf(remaining);

    for (let leftIndex = 0; leftIndex < nums.length; leftIndex++ ) {

        let remaining = target - nums[leftIndex];
        let paired = nums.indexOf(remaining, leftIndex + 1);

        if (paired > 0 && paired !== leftIndex) {
            return [leftIndex, paired];
        }
    }

    return [-1, -1];

};

let seed: number[] = [2, 7, 11, 15];
let target: number = 18;

let solution: number[] = twoSum(seed, target);

console.log(`solution: ${solution}`);
