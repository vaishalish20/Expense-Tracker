const submitBtn = document.getElementById("submit-btn")
let descEl = document.getElementById("desc")
let amtEl = document.getElementById("amt")

const expenseList = document.getElementById("expense-list")
const formEl = document.getElementById("form")


// ---------- Error message ----------
const errorMsg = document.createElement("p");
// errorMsg.textContent = "Enter both values";
// errorMsg.classList.add("text-red-500", "text-sm", "mt-2", "opacity-0","" ,  "mb-2");
errorMsg.classList.add =
"text-red-500 text-sm  opacity-0 invisible transition-opacity duration-300 mb-2";
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

    let errorText = "";
    if (descValue === "" || amtValue <= 0) {
        if (descValue === "" && amtValue <= 0) {
            errorMsg.textContent = "Please enter description and amount";
        }
        else if (descValue === "") {
            errorMsg.textContent = "Please enter expense description";
        }
        else if (amtValue <= 0) {
            errorMsg.textContent = "Enter amount greater than 0";
        }
        // reset first
        errorMsg.classList.add("opacity-0", "invisible");

        // force reflow (important)
        errorMsg.offsetHeight;

        // now show again
        errorMsg.textContent = errorText;
        errorMsg.classList.remove("opacity-0", "invisible");

        setTimeout(() => {
            errorMsg.classList.add("opacity-0", "invisible");
        }, 5000);

        return;
    }
    // if (descValue === "" || amtValue <= 0) {
    //     // errorMsg.classList.remove("hidden");
    //     errorMsg.classList.remove("opacity-0", "invisible");
    //     setTimeout(() => {
    //         // errorMsg.classList.add("hidden");
    //         errorMsg.classList.add("opacity-0", "invisible");

    //     }, 5000);

    //     return; // stop execution
    // }

    const expObj = {
        id: Date.now(),
        description: descValue,
        amount: amtValue,
    }

    expensesArray.push(expObj)
    localStorage.setItem("expenses", JSON.stringify(expensesArray))

    renderExpense(expObj);

    descEl.value = "";
    amtEl.value = "";

})

    function renderExpense(expensesArray) {
        
        const trEl = document.createElement("tr")
        trEl.classList.add("border-b")

        const descTd = document.createElement("td")
        descTd.textContent = expensesArray.description
        descTd.className = "py-2";

        const amtTd = document.createElement("td");
        amtTd.textContent = expensesArray.amount;
        amtTd.className = "py-2";

        const actionTd = document.createElement("td");
        actionTd.className = "py-2 flex gap-2 justify-center";

        const editBtn = document.createElement("button");
        editBtn.textContent = "📝";
        editBtn.className = "bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600 transition";

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "✘";
        removeBtn.className = "bg-red-500 text-white px-4 py-2 rounded text-sm hover:bg-red-600 transition";

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



