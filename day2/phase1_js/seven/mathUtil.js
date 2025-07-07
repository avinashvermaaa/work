function add (a,b){
    return a + b;
}
function subtract (a,b){
    return a - b;
}
function multiply (a,b){
    return a * b;
}
function divide (a,b){
    return a / b;
}


// module.exports = { add, subtract, multiply, divide };   -> require(`filepath)  sync loading
// export default { add, subtract, multiply, divide };         -> import(`filepath`) async loading
export default { add, subtract, multiply, divide };