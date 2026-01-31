const submitBtn = document.getElementById("submit-btn")
let descEl = document.getElementById("desc")
let amtEl = document.getElementById("amt")

let expensesArray = []
submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    console.log(typeof descEl.value);
    console.log(typeof amtEl.value);

    const expObj = {
        id: Date.now(),
        description: descEl.value.trim(),
        amount: Number(amtEl.value),
    }
    console.log(expObj);
    expensesArray.push(expObj)
    console.log(expensesArray);
    renderExpense(expObj);
    localStorage.setItem("expenses", JSON.stringify(expensesArray))


function renderExpense(expensesArray) {
    const expenseList = document.getElementById("expense-list")
    const trEl = document.createElement("tr")

    const descTd = document.createElement("td")
    descTd.textContent = expensesArray.description
    descTd.className = "py-2";

    const amtTd = document.createElement("td");
    amtTd.textContent = expensesArray.amount;
    amtTd.className = "py-2";

    const actionTd = document.createElement("td");
    actionTd.className = "py-2 flex gap-2 justify-center";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "text-blue-500 hover:underline text-sm";

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "text-red-500 hover:underline text-sm";

    actionTd.appendChild(editBtn);
    actionTd.appendChild(removeBtn);

    trEl.appendChild(descTd);
    trEl.appendChild(amtTd);
    trEl.appendChild(actionTd);

    expenseList.appendChild(trEl);
    
    // trEl.appendChild(descTd)
    // trEl.appendChild(amtTd)

    // expenseList.appendChild(trEl)
}

})


