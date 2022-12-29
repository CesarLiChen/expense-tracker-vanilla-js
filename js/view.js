console.log("view.js loaded");

// Creating class in new ES6 way.
class ExpenseView {
	constructor(model){
		console.log("A new ExpenseView obj has been created");
		this.DOM = this.selectDOMElements();
		this.model = model;
		this.editableExpenses = new Set();

		/*
			I'm subscribed to your changes, so whenever there are changes
			let me know. 'I' in this case is the ExpenseView.
		*/
		this.model.subscribe(this);
	}

	selectDOMElements() {
		return {
			deleteButtons: document.getElementsByClassName("delete"),
			editButtons: document.getElementsByClassName("edit"),
			editForms: document.getElementsByClassName("edit-expense-form"),
			errorMsg: document.getElementById("error"),
			expenseForm: document.getElementById("new-expense-form"),
			expenses: document.getElementById("expenses"),
		};
	}

	getDOM() {
		// return this.DOM; use below for better shielding.
		// This is done so other code cannot manipulate it.
		// All keys/values from this.DOM are put into the
		//new empty '{}' object.
		return Object.assign({}, this.DOM);
	}

	setExpenseEditable(expenseID) {
		this.editableExpenses.add(expenseID);
		this.notify();
	}

	unsetExpenseEditable(expenseID) {
		this.editableExpenses.delete(expenseID);
		this.notify();
	}

	notify() {
		console.log("Model has been updated");

		this.DOM.expenses.innerHTML = "";
		
		this.model.all().forEach( (expense) => {
			this.DOM.expenses.innerHTML += (this.editableExpenses.has(expense.id))
										? this.makeExpenseEditRow(expense)
										: this.makeExpenseDisplayRow(expense);
		});
	}

	makeExpenseField(value) {
		return `
			<div class="field"> 
				<h2>${value}</h2>
			</div>
		`;
	}

	// Curly braces to get values inside of what is passed as argument.
	makeExpenseEditRow({description, date, amount, id}) {
		return  `
			<div class="expense">
				<form class="edit-expense-form" data-id="${id}">
					<input type="text" name="description" value="${description}">
					<input type="text" name="date" value="${date}">
					<input type="text" name="amount" value="${amount}">

					<button type="reset">Cancel</button>
					<button type="submit">Save</button>
				</form>
			</div>
		`;
	}

	makeExpenseDisplayRow(expense) {
		const description = this.makeExpenseField(expense.description);
		const date = this.makeExpenseField(expense.date);
		const amount = this.makeExpenseField("$" + expense.amount);

		// Template strings, new on ES6. Creates html.
		// Variable syntax: ${}
		return `
			<div class="expense">
				${description}
				${date}
				${amount}

				<div class="actions">
					<button class="edit" data-id="${expense.id}">
						Edit
					</button>

					<button class="delete" data-id="${expense.id}">
						Delete
					</button>
				</div>
			</div>
		`;
	}

	displayAmountErrorMessage() {
		this.DOM.errorMsg.innerText = "Invalid amount!";
		this.DOM.errorMsg.className = "";
	}

	displayDateErrorMessage() {
		this.DOM.errorMsg.innerText = "Invalid date!";
		this.DOM.errorMsg.className = "";
	}

	hideErrorMessage() {
		this.DOM.errorMsg.innerText = "";
		this.DOM.errorMsg.className = "hidden";
	}
}