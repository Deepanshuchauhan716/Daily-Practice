// Initialize data in localStorage
function initializeData() {
  if (!localStorage.getItem("transactions")) {
    localStorage.setItem("transactions", JSON.stringify([]));
  }
  if (!localStorage.getItem("students")) {
    localStorage.setItem("students", JSON.stringify([]));
  }
  if (!localStorage.getItem("books")) {
    localStorage.setItem("books", JSON.stringify([]));
  }
}

// Call initialization
initializeData();

// Issue Book Form Handler
if (document.getElementById("issueBookForm")) {
  // Auto calculate due date
  const issueDateInput = document.getElementById("issueDate");
  const dueDateInput = document.getElementById("dueDate");

  if (issueDateInput) {
    issueDateInput.addEventListener("change", function () {
      const issueDate = new Date(this.value);
      const dueDate = new Date(issueDate);
      dueDate.setDate(issueDate.getDate() + 15);
      dueDateInput.value = dueDate.toISOString().split("T")[0];
    });
  }

  document
    .getElementById("issueBookForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      const transaction = {
        id: Date.now(),
        rollNo: document.getElementById("rollNo").value,
        studentName: document.getElementById("studentName").value,
        course: document.getElementById("course").value,
        phone: document.getElementById("phone").value,
        bookName: document.getElementById("bookName").value,
        bookId: document.getElementById("bookId").value,
        issueDate: document.getElementById("issueDate").value,
        dueDate: document.getElementById("dueDate").value,
        returnDate: null,
        fine: 0,
        status: "Issued",
      };

      // Save student
      let students = JSON.parse(localStorage.getItem("students"));
      const existingStudent = students.find(
        (s) => s.rollNo === transaction.rollNo,
      );
      if (!existingStudent) {
        students.push({
          rollNo: transaction.rollNo,
          name: transaction.studentName,
          course: transaction.course,
          phone: transaction.phone,
        });
        localStorage.setItem("students", JSON.stringify(students));
      }

      // Save book
      let books = JSON.parse(localStorage.getItem("books"));
      const existingBook = books.find((b) => b.bookId === transaction.bookId);
      if (!existingBook) {
        books.push({
          bookId: transaction.bookId,
          bookName: transaction.bookName,
          status: "Issued",
        });
        localStorage.setItem("books", JSON.stringify(books));
      }

      // Save transaction
      let transactions = JSON.parse(localStorage.getItem("transactions"));
      transactions.push(transaction);
      localStorage.setItem("transactions", JSON.stringify(transactions));

      alert("Book issued successfully!");
      this.reset();
      updateDashboard();
    });
}

// Search Transactions for Return
function searchTransactions() {
  const searchTerm = document.getElementById("searchTrans").value;
  let transactions = JSON.parse(localStorage.getItem("transactions"));

  const filtered = transactions.filter(
    (t) => t.rollNo.includes(searchTerm) && t.status === "Issued",
  );

  const transactionList = document.getElementById("transactionList");
  if (filtered.length === 0) {
    transactionList.innerHTML =
      '<div class="alert alert-danger">No active transactions found!</div>';
    return;
  }

  let html =
    '<div class="table-container"><table><tr><th>Book Name</th><th>Issue Date</th><th>Due Date</th><th>Action</th></tr>';
  filtered.forEach((trans) => {
    html += `
            <tr>
                <td>${trans.bookName}</td>
                <td>${trans.issueDate}</td>
                <td>${trans.dueDate}</td>
                <td><button onclick="showReturnSection(${trans.id})" class="btn-submit">Return</button></td>
            </tr>
        `;
  });
  html += "</table></div>";
  transactionList.innerHTML = html;
}

let selectedTransaction = null;

function showReturnSection(transId) {
  let transactions = JSON.parse(localStorage.getItem("transactions"));
  selectedTransaction = transactions.find((t) => t.id === transId);

  document.getElementById("returnSection").style.display = "block";
  document.getElementById("returnDate").value = new Date()
    .toISOString()
    .split("T")[0];
}

function calculateFine() {
  if (!selectedTransaction) return;

  const returnDate = new Date(document.getElementById("returnDate").value);
  const dueDate = new Date(selectedTransaction.dueDate);

  const diffTime = returnDate - dueDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let fine = 0;
  if (diffDays > 0) {
    fine = diffDays * 10;
  }

  const fineDetails = document.getElementById("fineDetails");
  fineDetails.innerHTML = `
        <div class="fine-card">
            <h3>Fine Details</h3>
            <p>Days Overdue: ${diffDays > 0 ? diffDays : 0} days</p>
            <p>Fine Amount: ₹${fine}</p>
            <button onclick="confirmReturn(${fine})" class="btn-submit">Confirm Return & Pay Fine</button>
        </div>
    `;
}

function confirmReturn(fine) {
  if (confirm(`Fine amount is ₹${fine}. Confirm return?`)) {
    let transactions = JSON.parse(localStorage.getItem("transactions"));
    const index = transactions.findIndex(
      (t) => t.id === selectedTransaction.id,
    );

    transactions[index].returnDate =
      document.getElementById("returnDate").value;
    transactions[index].fine = fine;
    transactions[index].status = "Returned";

    localStorage.setItem("transactions", JSON.stringify(transactions));

    alert("Book returned successfully!");
    location.reload();
  }
}

// View All Books
if (window.location.pathname.includes("view-books.html")) {
  displayBooks();
}

function displayBooks() {
  let transactions = JSON.parse(localStorage.getItem("transactions"));
  const booksContainer = document.getElementById("booksList");

  if (!booksContainer) return;

  const issuedBooks = transactions.filter((t) => t.status === "Issued");

  if (issuedBooks.length === 0) {
    booksContainer.innerHTML =
      '<div class="alert alert-info">No books issued currently!</div>';
    return;
  }

  let html =
    '<div class="table-container"><table><tr><th>Book ID</th><th>Book Name</th><th>Issued To</th><th>Roll No</th><th>Issue Date</th><th>Due Date</th></tr>';
  issuedBooks.forEach((book) => {
    html += `
            <tr>
                <td>${book.bookId}</td>
                <td>${book.bookName}</td>
                <td>${book.studentName}</td>
                <td>${book.rollNo}</td>
                <td>${book.issueDate}</td>
                <td>${book.dueDate}</td>
            </tr>
        `;
  });
  html += "</table></div>";
  booksContainer.innerHTML = html;
}

// View All Students
if (window.location.pathname.includes("view-students.html")) {
  displayStudents();
}

function displayStudents() {
  let students = JSON.parse(localStorage.getItem("students"));
  const studentsContainer = document.getElementById("studentsList");

  if (!studentsContainer) return;

  if (students.length === 0) {
    studentsContainer.innerHTML =
      '<div class="alert alert-info">No students registered!</div>';
    return;
  }

  let html =
    '<div class="table-container"><table><tr><th>Roll No</th><th>Name</th><th>Course</th><th>Phone</th></tr>';
  students.forEach((student) => {
    html += `
            <tr>
                <td>${student.rollNo}</td>
                <td>${student.name}</td>
                <td>${student.course}</td>
                <td>${student.phone}</td>
            </tr>
        `;
  });
  html += "</table></div>";
  studentsContainer.innerHTML = html;
}

// Fine Report
if (window.location.pathname.includes("fine-report.html")) {
  displayFineReport();
}

function displayFineReport() {
  let transactions = JSON.parse(localStorage.getItem("transactions"));
  const finesContainer = document.getElementById("finesList");

  if (!finesContainer) return;

  const returnedWithFine = transactions.filter(
    (t) => t.status === "Returned" && t.fine > 0,
  );

  if (returnedWithFine.length === 0) {
    finesContainer.innerHTML =
      '<div class="alert alert-info">No fines collected yet!</div>';
    return;
  }

  let totalFine = 0;
  let html =
    '<div class="table-container"><table><tr><th>Student Name</th><th>Roll No</th><th>Book Name</th><th>Due Date</th><th>Return Date</th><th>Fine Amount</th></tr>';
  returnedWithFine.forEach((trans) => {
    totalFine += trans.fine;
    html += `
            <tr>
                <td>${trans.studentName}</td>
                <td>${trans.rollNo}</td>
                <td>${trans.bookName}</td>
                <td>${trans.dueDate}</td>
                <td>${trans.returnDate}</td>
                <td>₹${trans.fine}</td>
            </tr>
        `;
  });
  html += `<tr style="background: #f0f0f0; font-weight: bold;"><td colspan="5">Total Fine Collected:</td><td>₹${totalFine}</td></tr>`;
  html += "</table></div>";
  finesContainer.innerHTML = html;
}

// Update Dashboard
function updateDashboard() {
  if (
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/"
  ) {
    let transactions = JSON.parse(localStorage.getItem("transactions"));
    let students = JSON.parse(localStorage.getItem("students"));

    const totalBooks = transactions.length;
    const totalStudents = students.length;
    const activeIssues = transactions.filter(
      (t) => t.status === "Issued",
    ).length;
    const totalFine = transactions
      .filter((t) => t.status === "Returned")
      .reduce((sum, t) => sum + t.fine, 0);

    document.getElementById("totalBooks").textContent = totalBooks;
    document.getElementById("totalStudents").textContent = totalStudents;
    document.getElementById("activeIssues").textContent = activeIssues;
    document.getElementById("totalFine").textContent = `₹${totalFine}`;
  }
}

// Call update on page load
updateDashboard();
