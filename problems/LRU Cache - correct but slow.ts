// Needed to make vscode not bitch about reassigning values.
export { };

/*

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

 * LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
 * int get(int key) Return the value of the key if the key exists, otherwise return -1.
 * void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.
The functions get and put must each run in O(1) average time complexity.


Example 1:

Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4
 

Constraints:

1 <= capacity <= 3000
0 <= key <= 104
0 <= value <= 105
At most 2 * 105 calls will be made to get and put.


*/

type CacheEntry = {
    index: string;
    value: number;
    hits: number;
}

interface Aarray {
    [key: string]: CacheEntry
}

class LRUCache {

    cache: Aarray[];
    size: number;
    entries: number;

    constructor(capacity: number) {
        this.size = capacity;
        this.cache = [];
        this.entries = 0;

        // for (let x = 0; x < capacity; x++) {
        //     this.cache[x] = { index: null, value: null, hits: 0 };
        // }
    }

    search(key: number | null): number | null {
        if (key === null) {
            for (let index = 0; index < this.size; index++) {
                if (this.cache[index].index === null) {
                    return index;
                }
            }
        } else {

            return this.cache[key.toString()];
            // for (let index = 0; index < this.size; index++) {
            //     if (this.cache[index].index === key.toString()) {
            //         return index;
            //     }
            // }
        }

        return null;
    }

    setHits(lastUsed: number) {

        for (let index = 0; index < this.size; index++) {
            if (index !== lastUsed) {
                if (this.cache[index]?.index !== null) {
                    this.cache[index].hits--;
                }
            }
        }
    }

    getLRU(): number {

        let LRU = 0;
        let minHit = this.cache[0].hits;

        for (let index = 1; index < this.size; index++) {
            if (this.cache[index].hits < minHit) {
                minHit = this.cache[index].hits;
                LRU = index;
            }
        }
        return LRU;
    }

    get(key: number): number {

        let itemIndex = this.search(key);

        if (itemIndex !== null) {
            this.cache[itemIndex].hits = 1;
            this.setHits(itemIndex);
            return this.cache[itemIndex].value;
        } else {
            return -1;
        }
    }

    put(key: number, value: number): null {

        let foundIndex = this.search(key);

        if (foundIndex !== null) {
            this.cache[foundIndex].value = value;
            this.cache[foundIndex].hits = 0;
            this.setHits(foundIndex);

        } else {

            let foundNull = this.search(null);

            if (foundNull !== null) {
                this.cache[foundNull].index = key.toString();
                this.cache[foundNull].value = value;
                this.cache[foundNull].hits = 0;
                this.setHits(foundNull);
            } else {

                let LRU = this.getLRU();

                this.cache[LRU].index = key.toString();
                this.cache[LRU].value = value;
                this.cache[LRU].hits = 0;
                this.setHits(LRU);
            }

        }

        return null;
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */


/*************** 
 *   T E S T   *
 ***************/

let commands = [];
let inputs = [];
let solution = [];

function runTest(commands: string[], inputs: number[][], solution: any, debug: boolean = false) {

    let cacheCommand = commands[0];
    let cacheSize = inputs[0][0];
    let resultString = "";
    let grade = "";

    let obj = new LRUCache(cacheSize);
    if (debug) console.log(`\ninit ${cacheCommand}[${cacheSize}] | null`);

    for (let index = 1; index < commands.length; index++) {

        let result = null;

        if (commands[index] === "put") {
            let inputIndex = inputs[index][0];
            let inputValue = inputs[index][1];
            result = obj.put(inputIndex, inputValue);
        }

        if (commands[index] === "get") {
            let getIndex = inputs[index][0];
            result = obj.get(getIndex);
        }

        if (solution !== false) {
            if (result === solution[index]) {
                grade = "✅";
            } else {
                grade = `❌ - ${solution[index]}`;
            }
        }

        if (debug) console.log(`command: ${commands[index]}, ${inputs[index]}  | ${result} - ${grade}`);
        if (debug) console.log(`\n obj: ${JSON.stringify(obj, null, 2)}`);
    }


    if (solution !== false) {
        solution.forEach((item) => {
            if (item) {
                resultString += `${item}, `;
            } else {
                resultString += "null, ";
            }
        });
    }

    if (debug) console.log(`results: ${resultString}`);
    if (debug) console.log();

}


// import largeCommands from './test_lru_commands.json';
// import largeInputs from './test_lru_inputs.json';

//console.log(`${largeCommands.length}`);
//console.log(`${largeInputs.length}`);
// runTest(largeCommands, largeInputs, false, false);



//process.exit();

//
// Test 1
//
commands = ["LRUCache","put","put","get","put","get","put","get","get","get"];
inputs = [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]];
solution = [null,null,null,1,null,-1,null,-1,3,4];

runTest(commands, inputs, solution, true);

process.exit();


//
// Test 2
//
commands = ["LRUCache", "put", "put", "get", "put", "put", "get"];
inputs = [[2], [2, 1], [2, 2], [2], [1, 1], [4, 1], [2]];
solution =  [null,null,null,2,null,null,-1];

runTest(commands, inputs, solution, false);


//
// Test 3
//
commands = ["LRUCache", "put", "put", "get", "get", "put", "get", "get", "get"];
inputs = [[2], [2, 1], [3, 2], [3], [2], [4, 3], [2], [3], [4]];
solution = [null,null,null,2,1,null,1,-1,3];


runTest(commands, inputs, solution, false);


//
// Test 4
//
commands = ["LRUCache","put","put","put","put","get","get","get","get","put","get","get","get","get","get"];
inputs = [[3], [1, 1], [2, 2], [3, 3], [4, 4], [4], [3], [2], [1], [5, 5], [1], [2], [3], [4], [5]];
solution = [null,null,null,null,null,4,3,2,-1,null,-1,2,3,-1,5];


runTest(commands, inputs, solution, false);


//
// Test 5
//
commands = ["LRUCache", "put", "put", "put", "put", "put", "get", "put", "get", "get", "put", "get", "put", "put", "put", "get", "put", "get", "get", "get", "get", "put", "put", "get", "get", "get", "put", "put", "get", "put", "get", "put", "get", "get", "get", "put", "put", "put", "get", "put", "get", "get", "put", "put", "get", "put", "put", "put", "put", "get", "put", "put", "get", "put", "put", "get", "put", "put", "put", "put", "put", "get", "put", "put", "get", "put", "get", "get", "get", "put", "get", "get", "put", "put", "put", "put", "get", "put", "put", "put", "put", "get", "get", "get", "put", "put", "put", "get", "put", "put", "put", "get", "put", "put", "put", "get", "get", "get", "put", "put", "put", "put", "get", "put", "put", "put", "put", "put", "put", "put"];
inputs = [[10], [10, 13], [3, 17], [6, 11], [10, 5], [9, 10], [13], [2, 19], [2], [3], [5, 25], [8], [9, 22], [5, 5], [1, 30], [11], [9, 12], [7], [5], [8], [9], [4, 30], [9, 3], [9], [10], [10], [6, 14], [3, 1], [3], [10, 11], [8], [2, 14], [1], [5], [4], [11, 4], [12, 24], [5, 18], [13], [7, 23], [8], [12], [3, 27], [2, 12], [5], [2, 9], [13, 4], [8, 18], [1, 7], [6], [9, 29], [8, 21], [5], [6, 30], [1, 12], [10], [4, 15], [7, 22], [11, 26], [8, 17], [9, 29], [5], [3, 4], [11, 30], [12], [4, 29], [3], [9], [6], [3, 4], [1], [10], [3, 29], [10, 28], [1, 20], [11, 13], [3], [3, 12], [3, 8], [10, 9], [3, 26], [8], [7], [5], [13, 17], [2, 27], [11, 15], [12], [9, 19], [2, 15], [3, 16], [1], [12, 17], [9, 1], [6, 19], [4], [5], [5], [8, 1], [11, 7], [5, 2], [9, 28], [1], [2, 2], [7, 4], [4, 22], [7, 24], [9, 26], [13, 28], [11, 26]];
solution = [null, null, null, null, null, null, -1, null, 19, 17, null, -1, null, null, null, -1, null, -1, 5, -1, 12, null, null, 3, 5, 5, null, null, 1, null, -1, null, 30, 5, 30, null, null, null, -1, null, -1, 24, null, null, 18, null, null, null, null, -1, null, null, 18, null, null, -1, null, null, null, null, null, 18, null, null, -1, null, 4, 29, 30, null, 12, -1, null, null, null, null, 29, null, null, null, null, 17, 22, 18, null, null, null, -1, null, null, null, 20, null, null, null, -1, 18, 18, null, null, null, null, 20, null, null, null, null, null, null, null];

runTest(commands, inputs, solution, true);

/*
 * I was doing this manually until I got into the longer caching test

// ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"];
// [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]];
// [null, null, null, 1, null, -1, null, -1, 3, 4];
let debug = 0;
let capacity = 2;
let obj = new LRUCache(capacity);

console.log("\ninit | null");
console.log(`put 1,1 | ${obj.put(1, 1)}`);
if (debug) console.log(`obj: ${JSON.stringify(obj, null, 2)}`);
console.log(`put 2,2 | ${obj.put(2, 2)}`);
if (debug) console.log(`obj: ${JSON.stringify(obj, null, 2)}`);
console.log(`get 1 | ${obj.get(1)}`);
if (debug) console.log(`obj: ${JSON.stringify(obj, null, 2)}`);
console.log(`put 3,3 | ${obj.put(3, 3)}`);
if (debug) console.log(`obj: ${JSON.stringify(obj, null, 2)}`);
console.log(`get 2 | ${obj.get(2)}`);
if (debug) console.log(`obj: ${JSON.stringify(obj, null, 2)}`);
console.log(`put 4,4 | ${obj.put(4, 4)}`);
if (debug) console.log(`obj: ${JSON.stringify(obj, null, 2)}`);
console.log(`get 1 | ${obj.get(1)}`);
if (debug) console.log(`obj: ${JSON.stringify(obj, null, 2)}`);
console.log(`get 3 | ${obj.get(3)}`);
if (debug) console.log(`obj: ${JSON.stringify(obj, null, 2)}`);
console.log(`get 4 | ${obj.get(4)}`);
if (debug) console.log(`obj: ${JSON.stringify(obj, null, 2)}`);
console.log();


// ["LRUCache","put","put","get","put","put","get"]
// [[2], [2, 1], [2, 2], [2], [1, 1], [4, 1], [2]]
// [null,null,null,2,null,null,-1]
debug = 0;
capacity = 2;
let obj2 = new LRUCache(capacity);

console.log("init | null");
console.log(`put 2,1 | ${obj2.put(2, 1)}`);
if (debug) console.log(`obj2: ${JSON.stringify(obj2, null, 2)}`);
console.log(`put 2,2 | ${obj2.put(2, 2)}`);
if (debug) console.log(`obj2: ${JSON.stringify(obj2, null, 2)}`);
console.log(`get 2 | ${obj2.get(2)}`);
if (debug) console.log(`obj2: ${JSON.stringify(obj2, null, 2)}`);
console.log(`put 1,1 | ${obj2.put(1, 1)}`);
if (debug) console.log(`obj2: ${JSON.stringify(obj2, null, 2)}`);
console.log(`put 4,1 | ${obj2.put(4, 1)}`);
if (debug) console.log(`obj2: ${JSON.stringify(obj2, null, 2)}`);
console.log(`get 2 | ${obj2.get(2)}`);
if (debug) console.log(`obj2: ${JSON.stringify(obj2, null, 2)}`);
console.log();


//["LRUCache", "put", "put", "get", "get", "put", "get", "get", "get"]
//[[2], [2, 1], [3, 2], [3], [2], [4, 3], [2], [3], [4]
//[null,null,null,2,1,null,1,-1,3]
debug = 0;
capacity = 2;
let obj3 = new LRUCache(capacity);

console.log("init | null");
console.log(`put 2,1 | ${obj3.put(2, 1)}`);
if (debug) console.log(`obj3: ${JSON.stringify(obj3, null, 2)}`);
console.log(`put 3,2 | ${obj3.put(3, 2)}`);
if (debug) console.log(`obj3: ${JSON.stringify(obj3, null, 2)}`);
console.log(`get 3 | ${obj3.get(3)}`);
if (debug) console.log(`obj3: ${JSON.stringify(obj3, null, 2)}`);
console.log(`get 2 | ${obj3.get(2)}`);
if (debug) console.log(`obj3: ${JSON.stringify(obj3, null, 2)}`);
console.log(`put 4,3 | ${obj3.put(4, 3)}`);
if (debug) console.log(`obj3: ${JSON.stringify(obj3, null, 2)}`);
console.log(`get 2 | ${obj3.get(2)}`);
if (debug) console.log(`obj3: ${JSON.stringify(obj3, null, 2)}`);
console.log(`get 3 | ${obj3.get(3)}`);
if (debug) console.log(`obj3: ${JSON.stringify(obj3, null, 2)}`);
console.log(`get 4 | ${obj3.get(4)}`);
if (debug) console.log(`obj3: ${JSON.stringify(obj3, null, 2)}`);
console.log();


//["LRUCache","put","put","put","put","get","get","get","get","put","get","get","get","get","get"]
// [[3], [1, 1], [2, 2], [3, 3], [4, 4], [4], [3], [2], [1], [5, 5], [1], [2], [3], [4], [5]]
// [null,null,null,null,null,4,3,2,-1,null,-1,2,3,-1,5]
debug = 0;
capacity = 3;
let obj4 = new LRUCache(capacity);

console.log("init | null");
console.log(`put 1,1 | ${obj4.put(1, 1)}`);
if (debug) console.log(`obj4: ${JSON.stringify(obj4, null, 2)}`);
console.log(`put 2,2 | ${obj4.put(2, 2)}`);
if (debug) console.log(`obj4: ${JSON.stringify(obj4, null, 2)}`);
console.log(`put 3,3 | ${obj4.put(3, 3)}`);
if (debug) console.log(`obj4: ${JSON.stringify(obj4, null, 2)}`);
console.log(`put 4,4 | ${obj4.put(4, 4)}`);
if (debug) console.log(`obj4: ${JSON.stringify(obj4, null, 2)}`);
console.log(`get 4 | ${obj4.get(4)}`);
if (debug) console.log(`obj4: ${JSON.stringify(obj4, null, 2)}`);
console.log(`get 3 | ${obj4.get(3)}`);
if (debug) console.log(`obj4: ${JSON.stringify(obj4, null, 2)}`);
console.log(`get 2 | ${obj4.get(2)}`);
if (debug) console.log(`obj4: ${JSON.stringify(obj4, null, 2)}`);
console.log(`get 1 | ${obj4.get(1)}`);
if (debug) console.log(`obj4: ${JSON.stringify(obj4, null, 2)}`);
console.log(`put 5,5 | ${obj4.put(5, 5)}`);
if (debug) console.log(`obj4: ${JSON.stringify(obj4, null, 2)}`);
console.log(`get 1 | ${obj4.get(1)}`);
if (debug) console.log(`obj4: ${JSON.stringify(obj4, null, 2)}`);
console.log(`get 2 | ${obj4.get(2)}`);
if (debug) console.log(`obj4: ${JSON.stringify(obj4, null, 2)}`);
console.log(`get 3 | ${obj4.get(3)}`);
if (debug) console.log(`obj4: ${JSON.stringify(obj4, null, 2)}`);
console.log(`get 4 | ${obj4.get(4)}`);
if (debug) console.log(`obj4: ${JSON.stringify(obj4, null, 2)}`);
console.log(`get 5 | ${obj4.get(5)}`);
if (debug) console.log(`obj4: ${JSON.stringify(obj4, null, 2)}`);
console.log();

*/