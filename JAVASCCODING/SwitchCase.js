// FIRST CLASS FUNCTION!!
// Assign a function to a variable

let Printhello = function(){
    console.log("Hello");
}
Printhello();
// passing a function as an argument
function sayHi() {
  console.log("Hello");
}

function test(x) {
  x();
}

test(sayHi);

// Returning a function