let arr = [12,34,56,78,87,65,43];  //find average

let sum = 0;

for(let val of arr){
    sum = sum + val;
}

let avg = sum / arr.length;
console.log(avg);
