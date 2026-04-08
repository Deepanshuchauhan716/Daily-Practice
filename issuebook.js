let form = document.querySelector("form");
let inp = document.querySelector("input");
let Issubtn = document.querySelector(".issu");
let Sname = document.querySelector(".StudentName");
let rollNum = document.querySelector(".RollNumber");
let BookName = document.querySelector(".BookName");
let IssuDate = document.querySelector(".IssuedDate");
let retunDate = document.querySelector(".ReturnDate");

Issubtn.addEventListener("click", function() {

    // Validation
    if (Sname.value == "" || rollNum.value == "" || BookName.value == "" || IssuDate.value == "" || retunDate.value == "") {
        alert("Fill all data");
        return;  // Yahan rukna hai
    }

    // Object banao (value .value se lo)
    let NewBook = {
        StudentName: Sname.value,
        roll: rollNum.value,
        book: BookName.value,
        issued: IssuDate.value,
        return: retunDate.value
    };

    // LocalStorage se data lao
    let allBooks = localStorage.getItem("books");
    if (allBooks == null) {
        allBooks = [];  // Pehli baar
    } else {
        allBooks = JSON.parse(allBooks);
    }
    

    allBooks.push(NewBook);
    
    // LocalStorage me save karo
    localStorage.setItem("books", JSON.stringify(allBooks));
    

    let tableBody = document.querySelector("#table_body");
    if (tableBody) {
        tableBody.innerHTML = "";
        
        for (let i = 0; i < allBooks.length; i++) {
            tableBody.innerHTML += `<tr>
                <td>${allBooks[i].StudentName}</td>
                <td>${allBooks[i].roll}</td>
                <td>${allBooks[i].book}</td>
                <td>${allBooks[i].issued}</td>
                <td>${allBooks[i].return}</td>
                <td>₹0</td>
            </tr>`;
        }
    }
    
    // Form clear karo
    Sname.value = "";
    rollNum.value = "";
    BookName.value = "";
    IssuDate.value = "";
    retunDate.value = "";
    
    alert("Book issued successfully!");
});