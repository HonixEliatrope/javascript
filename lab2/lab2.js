'use strict';
/**
 * Возводит х в степень n 
 * @param {number} x 
 * @param {number} n 
 * @returns 
 */
function pow(x, n) {
    return x ** n;
}
/**
 
 * @param {number} n 
 * @returns 
 */
function sumTo(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i
    }
    return sum;
}
/**
 
 * @param {number} year
 * @returns 
 */ 
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
/**
 * Считает факториал числа n
 * @param {number} n 
 * @returns 
 */
function factorial(n) {
    if (n <= 1) return 1n;
    else {
        return BigInt(n) * factorial(n - 1);
    }
}
/**
 * 
 * @param {number} n 
 * @returns  
 */
function fib(n) {
    let a = BigInt(1);
    let b = BigInt(1);
    if (n == BigInt(0)) {
        return BigInt(0);
    }
    else {
        for (let i = BigInt(3); i <= n; i++) {
           let c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
}
/**
 * 
 * @param {number} x 
 * @returns 
 */
function compare(x) {
    return function (y) {
        if (y > x) return true;
        else if (y < x) return false;
        else if (y == x) return null;
    }
}
/**
 * 
 * @returns 
 */
function sum() {
    var result = 0;
    for (let i = 0; i < arguments.length; i++) {
        result += arguments[i]
    }
    return result;
}
/**
 
 * @param {tring} obj
 * @returns 
 */ 
function addBlackSpot(obj) {
    const blackSpotSymbol = Symbol.for('blackSpot');
    obj[blackSpotSymbol] = true;
  return obj;
}