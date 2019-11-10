// Given an array of integers return the index of a peak.
// A peak is a number that is surrounded on both sides by a lower number
// ie: arr = [3,6,7,3,5,2,7] => arr[2] is a peak

function findPeak(arr) {
    let min = 0;
    let max = arr.length;
    let guessIndex = parseInt((max-min)/2, 0);
    let numLoops = 0
    while(numLoops < arr.length) {
        // console.log('checking', guessIndex, arr[guessIndex]);

        if (guessIndex === 0 || guessIndex === arr.length -1) {
            return arr[guessIndex]
        }
        if ((arr[guessIndex] > arr[guessIndex - 1]) &&
            (arr[guessIndex] > arr[guessIndex + 1])) {
            return arr[guessIndex]
        }
        if (arr[guessIndex + 1] >= arr[guessIndex]) { //upward sloping
            guessIndex += 1;
        } else { //downward sloping
            guessIndex -= 1;
        }
        numLoops += 1
    }
    return 'no peaks? hmmm'
}

function testEquality(func, args, expected) {
    const actual = func(args);
    if (actual === expected) {
        console.log(`[PASS]: ${args} ===> ${actual}`)

    } else {
        console.log(`\n[FAIL]: ${args}\nActual__:${actual}\nExpected:${expected}\n`)

    }
}

testEquality(findPeak, [1, 2, 3, 4, 10, 9, 8, 7, 6, 5, 4, 3, 2], 10);
testEquality(findPeak, [1, 2, 3, 4, 5, 6, 7, 8, 9, 3, 2,], 9);
testEquality(findPeak, [5, 8, 3, 2, 1], 8);
testEquality(findPeak, [3, 5, 6, 6, 6, 6, 8, 4], 8);
testEquality(findPeak, [2, 3, 4, 5, 6, 6, 7, 8, 9], 9);
testEquality(findPeak, [3, 4, 2, 1, 2, 3, 4, 2], 4);
testEquality(findPeak, [1, 2, 3, 4, 5, 6, 7, 8, 9], 9);
testEquality(findPeak, [9, 8, 7, 6, 5, 4, 3, 2, 1], 9)

