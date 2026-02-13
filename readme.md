# 💰 Expense Tracker

A simple browser-based **Expense Tracker** built using **JavaScript, HTML, and Tailwind CSS**.  
It allows users to add, edit, and delete expenses while automatically calculating the total amount spent.  
Data is stored in **LocalStorage**, so expenses persist even after page reload.

---

## ✨ Features

✔ Add expenses with description and amount  
✔ Input validation with error messages  
✔ Edit existing expenses  
✔ Remove expenses  
✔ Automatic total calculation  
✔ Data persistence using LocalStorage  
✔ Indian currency formatting (₹)

---

## ⚙️ How It Works

### ➕ Add Expense
When the user enters a description and amount and clicks **Add**:

- Inputs are validated  
- Expense object is created  
- Saved to array + LocalStorage  
- Row is rendered in table  
- Total updates automatically  

---

### ✏️ Edit Expense
When **Edit** button is clicked:

- Row values load into input fields  
- Original entry is removed from array + storage  
- User updates and re-adds it  

---

### ❌ Remove Expense
When **Remove** button is clicked:

- Selected expense is deleted from array  
- Removed from LocalStorage  
- Row disappears instantly  
- Total recalculates  

---

### 🛡 Validation Rules

- Description cannot be empty  
- Amount must be a valid number greater than 0  
- Error message appears if invalid  

---

## 💾 Storage Logic

Expenses are stored in browser using:

