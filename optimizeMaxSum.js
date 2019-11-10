// Given two arrays of numbers find the max sum of two elements (one from each array)
// Then if provided a target, find the max sum that stays below or at the target
// ie: [1, 5, 2, 3] and [3, 5, 4, 7] target = 11
// return 10 (3+7) or (5+5)

function findMaxSum(arr1, arr2, target) {
    const allSums = [];
    arr1.forEach((item1) => {
        arr2.forEach((item2) => {
            allSums.push(item1 + item2)
        })
    });

    return allSums.reduce((maxSum, sum) => {
        if (sum <= target && sum > maxSum) {
            return sum;
        }
        return maxSum
    }, -1);
}

function findMaxSumBetter(arr1, arr2, target) {
    const allSums = [];
    arr1.forEach((item1) => {
        arr2.forEach((item2) => {
            if (item1 + item2 <= target) {
                allSums.push(item1 + item2);
            }
        });
    });
    if (allSums.length !== 0) {
        return allSums.sort((a, b) => a-b)[allSums.length -1];
    }
    return -1
}

function findMaxSumBest(arr1, arr2, target) {
    arr1.sort((a, b) => b-a);
    arr2.sort((a, b) => b-a);
    let longArray;
    let shortArray;

    if (arr1.length >= arr2.length) {
        longArray = arr1;
        shortArray = arr2;
    } else {
        longArray = arr2;
        shortArray = arr1;
    }
    let found = null;
    // let checks =0;

        for(let i=0; !found && i < longArray.length; i+=1) {
            if (longArray[i] > target) continue;
            for (let j = 0; !found && j < shortArray.length; j += 1) {
                // checks += 1;
                if (longArray[i] + shortArray[j] <= target) {
                    found = longArray[i] + shortArray[j]
                }
            };

        };
    // console.log(checks)
    return found ? found : -1
}


function testEquality(func, args, expected) {
    actual = func(...args);
    if (actual === expected){
        console.log(`[PASS]: ${args[0]} | ${args[1]} | target:${args[2]} ===> ${actual}`)
    } else {
        console.log(`\n[FAIL]: ${args[0]} | ${args[1]}\nActual__:${actual}\nExpected:${expected}\n`)
    }
}
console.time();
testEquality(findMaxSum, [[1, 5, 2, 3], [3, 5, 4, 7], 11], 10);
testEquality(findMaxSum, [[1, 5, 2, 3], [3, 5, 4, 7], 5], 5);
testEquality(findMaxSum, [[1, 5, 2, 3], [3, 5, 4, 7], 3], -1);
testEquality(findMaxSum, [[1, 5, 2, 3, 10, 55, 30, 20, 15], [3, 5,], 27], 25);
testEquality(findMaxSum, [[1, 44, 60, 22, 31, 88, 55, 74, 35], [5, 3, 7, 8, 1], 50], 49);
testEquality(findMaxSum, [[1, 44, 60, 22, 31, 88, 55, 74, 35], [5, 3, 7, 8, 1], 37], 36);
console.timeEnd();

console.time();
testEquality(findMaxSumBetter, [[1, 5, 2, 3], [3, 5, 4, 7], 11], 10);
testEquality(findMaxSumBetter, [[1, 5, 2, 3], [3, 5, 4, 7], 5], 5);
testEquality(findMaxSumBetter, [[1, 5, 2, 3], [3, 5, 4, 7], 3], -1);
testEquality(findMaxSumBetter, [[1, 5, 2, 3, 10, 55, 30, 20, 15], [3, 5,], 27], 25);
testEquality(findMaxSumBetter, [[1, 44, 60, 22, 31, 88, 55, 74, 35], [5, 3, 7, 8, 1], 50], 49);
testEquality(findMaxSumBetter, [[1, 44, 60, 22, 31, 88, 55, 74, 35], [5, 3, 7, 8, 1], 37], 36);
console.timeEnd();

console.time();
testEquality(findMaxSumBest, [[1, 5, 2, 3], [3, 5, 4, 7], 11], 10);
testEquality(findMaxSumBest, [[1, 5, 2, 3], [3, 5, 4, 7], 5], 5);
testEquality(findMaxSumBest, [[1, 5, 2, 3], [3, 5, 4, 7], 3], -1);
testEquality(findMaxSumBest, [[1, 5, 2, 3, 10, 55, 30, 20, 15], [3, 5,], 27], 25);
testEquality(findMaxSumBest, [[1, 44, 60, 22, 31, 88, 55, 74, 35], [5, 3, 7, 8, 1], 50], 49);
testEquality(findMaxSumBest, [[1, 44, 60, 22, 31, 88, 55, 74, 35], [5, 3, 7, 8, 1], 37], 36);

console.timeEnd();

