const submitBtn = document.getElementById("submit-btn");
const descEl = document.getElementById("desc");
const amtEl = document.getElementById("amt");
const expenseList = document.getElementById("expense-list");
const formEl = document.getElementById("form");
let editingId = null;

const errorMsg = document.createElement("p");
errorMsg.className =
    "text-red-500 text-sm mb-2 invisible opacity-0 transition-opacity duration-300";
formEl.insertAdjacentElement("afterend", errorMsg);

// ---------- State ----------
let expensesArray = JSON.parse(localStorage.getItem("expenses")) || [];

// ---------- Load from localStorage on refresh ----------
expensesArray.forEach(renderExpense);

// ---------- Event ----------
submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const descValue = descEl.value.trim();
    const amtValue = Number(amtEl.value);

    // validation
    if (!descValue || amtValue <= 0) {
        showError(
            !descValue && amtValue <= 0
                ? "Please enter description and amount"
                : !descValue
                    ? "Please enter expense description"
                    : "Enter amount greater than 0"
        );
        return;
    }

    const expObj = {
        id: Date.now(),
        description: descValue,
        amount: amtValue,
    };

    expensesArray.push(expObj);
    localStorage.setItem("expenses", JSON.stringify(expensesArray));

    renderExpense(expObj);

    // reset inputs
    descEl.value = "";
    amtEl.value = "";
});

// ---------- Functions ----------
function renderExpense(expense) {
    const tr = document.createElement("tr");
    tr.dataset.id = expense.id;
    tr.className = "border-b";

    tr.innerHTML = `
    <td class="desc py-2">${expense.description}</td>
    <td class="amt py-2">${expense.amount}</td>
    <td class="py-2 flex gap-2 justify-center">
      <button class="edit bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">📝</button>
      <button class="remove bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600">✘</button>
    </td>
  `;

    expenseList.appendChild(tr);
}

function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.remove("invisible", "opacity-0");

    setTimeout(() => {
        errorMsg.classList.add("opacity-0", "invisible");
    }, 5000);
}

expenseList.addEventListener("click", function (e) {
    const row = e.target.closest("tr");
    if (!row) return;

    const id = Number(row.dataset.id);

    if (e.target.classList.contains("remove")) {
        expensesArray = expensesArray.filter(exp => exp.id !== id);
        localStorage.setItem("expenses", JSON.stringify(expensesArray));
        row.remove();
    }

    if (e.target.classList.contains("edit")) {
        const row = e.target.closest("tr");
        const id = Number(row.dataset.id);

        // 1️⃣ Fill inputs
        const desc = row.querySelector(".desc").textContent;
        const amt = row.querySelector(".amt").textContent;

        descEl.value = desc;
        amtEl.value = amt;

        // 2️⃣ REMOVE old expense immediately
        expensesArray = expensesArray.filter(exp => exp.id !== id);
        localStorage.setItem("expenses", JSON.stringify(expensesArray));

        // 3️⃣ Remove row from UI
        row.remove();
    }

    //   if (e.target.classList.contains("edit")) {
    //   const desc = row.querySelector(".desc").textContent;
    //   const amt = row.querySelector(".amt").textContent;

    //   descEl.value = desc;
    //   amtEl.value = amt;

    //   editingId = id;
    // }

});


