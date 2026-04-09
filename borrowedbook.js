function logout(){
    localStorage.removeItem("isLoggedIn");
    window.location.href = "index.html";
}

function CalculateFine(returnDate){
    let today = new Date();
    let returnD = new Date(returnDate);

    today.setHours(0,0,0,0);
    returnD.setHours(0,0,0,0);

    let diff = today - returnD;  

    let daysLate = Math.floor(diff / (1000 * 60 * 60 * 24));

    if(daysLate > 0){
        return daysLate * 10;
    }else{
        return 0;
    }
}

window.onload = function(){

    let data = JSON.parse(localStorage.getItem("students")) || [];

    let tableBody = document.getElementById("table_body");
    let update = false;

    data.forEach(function(item){

        let currentFine = CalculateFine(item.returnDate);
         if(item.fine !== currentFine){
            item.fine = currentFine;
            updated = true;
        }


        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.roll}</td>
            <td>${item.book}</td>
            <td>${item.issueDate}</td>
            <td>${item.returnDate}</td>
            <td>${item.id}</td>
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

             let fineAmount = CalculateFine(item.returnDate);
            let row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.name || ''}</td>
                <td>${item.roll || ''}</td>
                <td>${item.book || ''}</td>
                <td>${item.issueDate || ''}</td>
                <td>${item.returnDate || ''}</td>
                <td>${item.id || ''}</td>
             <td>${fineAmount}${"</td>"}                 
            `;
            tableBody.appendChild(row);
        }
    });

    if(!found){
        tableBody.innerHTML = "<tr><td colspan='6'>No Data Found </td></tr>";
    }
});

