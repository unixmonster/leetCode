
// Needed to make vscode not bitch about reassigning values.
//export { };


function lengthOfLongestSubstring(s: string): number {

    let leftPtr = 0;
    let currentMax = 0;
    let currentString = "";
    let currentChar = "";

    for (let index = 0; index < s.length; index++) {

        currentChar = s[index];
        currentString = s.slice(leftPtr, index);

        console.log(`[${leftPtr}, ${index}] | ${currentChar} | ${currentString}`);

        if (currentString.indexOf(currentChar) >= 0 && index > 0) {
            console.log(`exists at ${currentString.indexOf(currentChar)}`);

            if (currentString.length > currentMax) {
                currentMax = currentString.length;
            }

            leftPtr = leftPtr + 1
            index = leftPtr
        }
  
    }

    currentChar = s[s.length - 1];
    currentString = s.slice(leftPtr, s.length);
    console.log(`[${leftPtr}, ${s.length - 1}] | ${currentChar} | ${currentString}`);
 
    if (currentString.length > currentMax) {
        currentMax = currentString.length;
    }

    return currentMax;

};

//let seed: string = "aaaaaaaa";
//let seed: string = "dvdf";
let seed: string = "pwwkew";
let solution: number = lengthOfLongestSubstring(seed);

console.log(`solution: ${solution}`);

