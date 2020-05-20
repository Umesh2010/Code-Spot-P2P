"use strict";
exports.__esModule = true;
var CustomNumber_1 = require("./CustomNumber");
var MAX_NUMBER_BASE_10 = 100000; // For base 10 testing only
function numToArrDigit(n) {
    var arr = [];
    while (n > 0) {
        arr.unshift(n % 10);
        n = Math.floor(n / 10);
    }
    return arr;
}
// Will console.error() an error if there is any
function testSubtractGreaterThanBase10(numberOfTestCases) {
    var numError = 0;
    for (var i = 0; i < numberOfTestCases; i++) {
        var a = Math.floor(Math.random() * MAX_NUMBER_BASE_10) + 1; // Generate number from 1 to MAX_NUMBER
        var b = MAX_NUMBER_BASE_10;
        while (b >= a) {
            b = Math.floor(Math.random() * MAX_NUMBER_BASE_10); // b from 0 to MAX_NUMBER-1
        }
        var resultShouldBe = a - b;
        var customNumberA = new CustomNumber_1.CustomNumber(numToArrDigit(a));
        var customNumberB = new CustomNumber_1.CustomNumber(numToArrDigit(b));
        var actualResult = CustomNumber_1.CustomNumber.subtractGreaterThan(customNumberA, customNumberB);
        if (actualResult.arr[0] == 0) {
            console.error('ERROR: testSubtractGreaterThanBase10: Error: 0 at beginning!');
            numError++;
        }
        if (resultShouldBe !== parseInt(actualResult.toString())) {
            console.error('ERROR: ' + a + ' - ' + b + ' = ' + resultShouldBe +
                ', actualResult: ' + actualResult.toString());
            numError++;
        }
    }
    console.log('Tested CustomNumer.subtractGreaterThan() with ' + numberOfTestCases
        + ' test cases, ' + numError + ' errors found');
}
// Will console.error() an error if there is any
function testAddBase10(numberOfTestCases) {
    var numError = 0;
    for (var i = 0; i < numberOfTestCases; i++) {
        var a = Math.floor(Math.random() * MAX_NUMBER_BASE_10) + 1; // Generate number from 1 to MAX_NUMBER
        var b = Math.floor(Math.random() * MAX_NUMBER_BASE_10) + 1;
        var resultShouldBe = a + b;
        var customNumberA = new CustomNumber_1.CustomNumber(numToArrDigit(a));
        var customNumberB = new CustomNumber_1.CustomNumber(numToArrDigit(b));
        var actualResult = CustomNumber_1.CustomNumber.add(customNumberA, customNumberB);
        if (actualResult.arr[0] == 0) {
            console.error('ERROR: testAddBase10: Error: 0 at beginning!');
            numError++;
        }
        if (resultShouldBe !== parseInt(actualResult.toString())) {
            console.error('ERROR: ' + a + ' + ' + b + ' = ' + resultShouldBe +
                ', actualResult: ' + actualResult.toString());
            numError++;
        }
    }
    console.log('Tested CustomNumer.add() with ' + numberOfTestCases
        + ' test cases, ' + numError + ' errors found');
}
// Will console.error() an error if there is any
function testGenerateLessThan(numberOfTestCases) {
    var MAX_NUM_DIGIT = 1;
    var NUM_TEST_PER_NUMBER = 100;
    var numError = 0;
    for (var i = 0; i < numberOfTestCases; i++) {
        var numDigits = Math.floor(Math.random() * MAX_NUM_DIGIT) + 1;
        var arr = [];
        for (var j = 0; j < numDigits; j++) {
            arr[j] = Math.floor(Math.random() * CustomNumber_1.CustomNumber.BASE);
        }
        var bigger = new CustomNumber_1.CustomNumber(arr);
        // bigger should never be 0, since 'nothing' is less than 0
        bigger = CustomNumber_1.CustomNumber.add(bigger, new CustomNumber_1.CustomNumber([1]));
        for (var j = 0; j < NUM_TEST_PER_NUMBER; j++) {
            var smaller = CustomNumber_1.CustomNumber.generateLessThan(bigger);
            if (smaller.compareTo(bigger) >= 0) { // If smaller is actually not smaller
                console.error('ERROR: Test generateLessThan, smaller of ' +
                    bigger.toString() + ' is ' + smaller.toString());
                numError++;
            }
        }
    }
    console.log('Tested CustomNumer.generateLessThan() with ' + numberOfTestCases
        + ' test cases, ' + numError + ' errors found');
}
// NOTE: check BASE in CustomNumber before run test
testSubtractGreaterThanBase10(10000);
testAddBase10(10000);
testGenerateLessThan(1000); // Choose small numberOfTestCases since each test case will be tested 100 times
