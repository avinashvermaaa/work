//  1. Write a function to calculate the factorial of a number.

function factorial(number){
    let result = 1;
    for (let i = 1; i <=number; i++){
        result = result * i;
    }

    return result;
}
let number = 6;
console.log(`factorial is : ${factorial(number)}`);


// 2. Create a function to check if a string is a palindrome.

function isPalindrome(string){
    let start = 0, end = string.length - 1;
    while(start < end){
        if(string[start] != string[end]){
            return false;
        }
        start++;
        end--;
    }
    return true;
}

let str =  `madam`;    // "madam" "racecar" "level" 
console.log(isPalindrome(str));

function arrayAverage(...arr){
    let sum = 0;
    arr.forEach( num =>{
        sum += num;
    });
    return sum / arr.length;
}

let numbers = [1, 2, 3, 4, 5];
console.log(arrayAverage(1,2,3,4,5));
console.log(arrayAverage(...numbers)); // spread operator

// 4. Use a callback function that logs a message after a 2-second delay.

function delayedLog(message, callback){
    setTimeout(() =>{
        console.log(message);
        callback();
    },2000);
}

console.log(`delayed message will be logged after 2 seconds...`);

delayedLog(`This is a delayed message`, () => {
    console.log(`Callback executed after delay`);
});