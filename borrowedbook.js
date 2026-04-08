function logout(){
    localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
}

window.onload = function(){

    let data = JSON.parse(localStorage.getItem("students")) || [];

    let tableBody = document.getElementById("table_body");

    data.forEach(function(item){

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.roll}</td>
            <td>${item.book}</td>
            <td>${item.issueDate}</td>
            <td>${item.returnDate}</td>
            <td>${item.fine}</td>
        `;

        tableBody.appendChild(row);
    });
};

document.querySelector(".Search_btn").addEventListener("click", function(){

    let rollInput = document.querySelector(".Search").value.trim();
    let data = JSON.parse(localStorage.getItem("students")) || [];
    let tableBody = document.getElementById("table_body"); 

    tableBody.innerHTML = "";
    let found = false;

    data.forEach(function(item){
        if(String(item.roll) === rollInput){
            found = true;
            let row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name || ''}</td>
                <td>${item.roll || ''}</td>
                <td>${item.book || ''}</td>
                <td>${item.issueDate || ''}</td>
                <td>${item.returnDate || ''}</td>
                <td>${item.fine || ''}</td>
            `;
            tableBody.appendChild(row);
        }
    });

    if(!found){
        tableBody.innerHTML = "<tr><td colspan='6'>No Data Found </td></tr>";
    }
});

