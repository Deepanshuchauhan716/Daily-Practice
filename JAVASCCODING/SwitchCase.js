// Early Return Pattern !
// used in function to exit early if some condition fails

function checkAge(age){
    if(age < 18) return "Denied";
    return "Allowed";
}

console.log(checkAge(22));