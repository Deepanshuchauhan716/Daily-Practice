// Scope in js
// Function scope and Block scope in js
//  1 => Let & Const jo ki Block scopes hai ye {} ki respect krte hai !!

if(true){
    let a = 12;
    const b = 13;
    console.log(a,b);  //This is valid✅
}

console.log(a,b); //This is not valid becoz let and const respect {} !!
