console.log("view.js loaded");

// Creating class in new ES6 way.
class ExpenseView {
	constructor(model){
		console.log("A new ExpenseView obj has been created");
		this.DOM = this.selectDOMElements();
		this.model = model;

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

	notify() {
		console.log("Model has been updated");

		this.DOM.expenses.innerHTML = "";
		
		this.model.all().forEach( (expense) => {

			const description = this.makeExpenseField(expense.description);
			const date = this.makeExpenseField(expense.date);
			const amount = this.makeExpenseField("$" + expense.amount);

			// Template strings, new on ES6. Creates html.
			// Variable syntax: ${}
			const expenseRow = `
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

			this.DOM.expenses.innerHTML += expenseRow;
		});
	}

	makeExpenseField(value) {
		return `
			<div class="field"> 
				<h2>${value}</h2>
			</div>
		`;
	}
}