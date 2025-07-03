// Arrow function
const add = (a, b) => {
// have to return if a scope is opened with curly braces
 return a + b;
}
a = 5;
b = 6;
console.log(`add is : ${add(a, b)}`);


// parameter vs arguments
    // parameters are the names listed in the function definition
    // arguments are the values passed to the function when it is called

function myname(name){ // name is parameter
    console.log(`my name is ${name}`);
}
// function calling with an argument
myname(`Avinash Kumar`);

// function calling and then stoing the return value in a variable
function cube(number){
    return number * number * number; 
}

let result = cube(3);
console.log(`cube of result : ${cube(result)}`);

// default parameters
function greet(name = 'user'){
    console.log(`hello ${name}`);  
    return `hello ${name}`; 
}

console.log(greet(`avinash`));
console.log(greet()); 


// rest parameter or Multiple paraameters
function sums(...numbers){
    let sum = 0;
    for (let i = 0; i<numbers.length; i++){
        sum += numbers[i];
    }
    return sum;
}

console.log(sums(1,2,3,4,5));       // 15
console.log(sums(1,2,3,4,5,`avi`)); // 15avi