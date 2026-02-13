const submitBtn = document.getElementById("submit-btn");
const descEl = document.getElementById("desc");
const amtEl = document.getElementById("amt");
const expenseList = document.getElementById("expense-list");
const formEl = document.getElementById("form");
const totalEl = document.getElementById("total");


// Creating error message element and adding styles and classes to it
const errorMsg = document.createElement("p");
// let editingId = null;
// invisible opacity-0 transition-opacity duration-300
errorMsg.className =
  "text-red-500 text-sm mb-2 h-5";
formEl.insertAdjacentElement("afterend", errorMsg);

// Array to hold expenses, if localStorage has data then parse it otherwise initialize with empty array
let expensesArray = JSON.parse(localStorage.getItem("expenses")) || [];

// Passing each element of array to render function
expensesArray.forEach(renderExpense);
// Example of forEach: [1,2,3].forEach(n => console.log(n));

updateTotal()

// Event listener for submit/Add button
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  // prevents empty or space-only inputs like " " from being accepted and ensures clean data is stored or validated.
  let descValue = descEl.value.trim();
  const amtValue = Number(amtEl.value);

  // Input values validation
  if (!descValue || amtValue <= 0) {
    showError(
      !descValue && amtValue <= 0 ? "Please enter description and amount" : !descValue ? "Please enter expense description" : "Enter amount greater than 0"
    );
    return;
  }

  // Limiting description to 25 characters and adding "..." if it exceeds the limit
  // descValue = descValue.slice(0, 20);
  displayText = descValue.length > 25 ? descValue.slice(0, 25) + "..." : descValue;


  if (Number.isNaN(amtValue)) {
    showError("Amount must be a number");
    return;
  }

  //creating an expense object
  const expObj = {
    id: Date.now(),
    description: displayText,
    amount: amtValue,
  };

  //pushing to array and localStorage
  expensesArray.push(expObj);
  localStorage.setItem("expenses", JSON.stringify(expensesArray));

  //calling render function to display the new expense in the table
  renderExpense(expObj);

  updateTotal()
  // reset inputs
  descEl.value = "";
  amtEl.value = "";
});

// Render function to display an expense in the table
function renderExpense(expense) {
  const tr = document.createElement("tr");
  tr.dataset.id = expense.id;
  tr.className = "border-b";
  //  <td class="flex flex-wrap gap-2 justify-center py-2">
  //  <td class="amt py-2">${expense.amount}</td>
  tr.innerHTML = `
    <td class="desc py-2">${expense.description}</td>
   <td class="amt py-2">${formatINR(expense.amount)}</td>
   <td class="py-2 flex gap-2 justify-center">
      <button class="edit bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">📝</button>
      <button class="remove bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">✘</button>
    </td>
  `;

  expenseList.appendChild(tr);
}

// showError function to display error messages
function showError(message) {
  errorMsg.textContent = message;
  errorMsg.classList.remove("invisible", "opacity-0");

  setTimeout(() => {
    errorMsg.classList.add("opacity-0", "invisible");
  }, 5000);
}



expenseList.addEventListener("click", function (e) {
  // to find the closest parent <tr> element of the clicked target, which represents the entire row of the expense item in the table. 
  // This allows us to identify which expense item is being interacted with, whether it's for editing or removing.
  const row = e.target.closest("tr");

  // If click wasn’t inside a row → stop execution. 
  // This prevents errors that would occur if we tried to access properties of a non-existent row when clicking outside of the expense items.
  if (!row) return;

  const id = Number(row.dataset.id);

  if (e.target.classList.contains("remove")) {
    expensesArray = expensesArray.filter(exp => exp.id !== id);
    localStorage.setItem("expenses", JSON.stringify(expensesArray));
    updateTotal()
    row.remove();
  }

  if (e.target.classList.contains("edit")) {
    const row = e.target.closest("tr");
    const id = Number(row.dataset.id);

    // 1️⃣ Fill inputs
    const desc = row.querySelector(".desc").textContent;
    // const amt = row.querySelector(".amt").textContent;
    const amt = row.querySelector(".amt").textContent
      .replace(/[₹,]/g, "")
      .trim();


    descEl.value = desc;
    amtEl.value = amt;

    // 2️⃣ REMOVE old expense immediately
    expensesArray = expensesArray.filter(exp => exp.id !== id);
    localStorage.setItem("expenses", JSON.stringify(expensesArray));

    updateTotal()

    // 3️⃣ Remove row from UI
    row.remove();
  }

});


function updateTotal() {
  const total = expensesArray.reduce((sum, exp) => sum + exp.amount, 0);
  // totalEl.textContent = `₹${total}`;   --to display total without formatting
  // totalEl.textContent = `₹${total.toLocaleString("en-IN")}`;  -- to display total with commas as thousand separators but without decimal places
  totalEl.textContent = formatINR(total);


}
// To format the amount in Indian Rupees format with commas as thousand separators and two decimal places.
function formatINR(value) {
  return `₹${Number(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}
