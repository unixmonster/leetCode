
// Needed to make vscode not bitch about reassigning values.
export { };

/**
 * The knows API is defined in the parent class Relation.
 * isBadVersion(version: number): boolean {
 *     ...
 * };
 */

let number = 6;
let bad = 5;

function isBadVersion(version: number): Boolean {
        return version >= bad;
}

var solution = function (isBadVersion: any) {

    return function (n: number): number {

        let left = 1;
        let right = n;

        while (left < right) {

            let mid = Math.floor(left + ((right - left) / 2));

            //console.log(`mid: ${mid}`);

            if (isBadVersion(mid)) {
                right = mid;
            } else {
                left = mid + 1;
            }

        }

        return left;

    };
};


console.log(solution(number));