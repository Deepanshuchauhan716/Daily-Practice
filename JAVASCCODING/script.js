// Hoisting in java script!!
// JS prepare memory before Running code it move all decalaration to the top!

console.log(a);
var a = 10;  //Output is Undefined 

// In Memory 
// 1 => var a;
// 2 => console.log(a);
// 3 => a = 10;  This is the reseaon Undefined✅
