/* 
	Part of the code that connects
	the 'view' with the 'model'.
*/

class ExpenseController {
	constructor(view, model) {
		console.log("controller obj has been created");
		this.DOM = view.getDOM();
		this.model = model;

		/*
			We do below because:
			we want addExpense() to get the ExpenseController object, 
			without line below it will get the 'form' object with id
			new-expense-form.
		*/
		this.addExpense = this.addExpense.bind(this);
		this.removeExpense = this.removeExpense.bind(this);
		
		console.log(this);

		this.setUpEventHandlers();
	}

	setUpEventHandlers() {
		this.DOM.expenseForm.addEventListener("submit", this.addExpense);

		// getElementsByClassName returns a 'node' list
		// Convert node to array by [... {node list}]
		// Arrays have forEach method, node list's don't
		[...this.DOM.deleteButtons].forEach( (deleteButton) => {
			deleteButton.addEventListener("click", this.removeExpense);
		});
	}

	// some people named it 'e', 'evt'
	addExpense(event) {

		// Prevent default so it doesn't refresh page.
		event.preventDefault();

		const form = event.currentTarget; //instead of event.target

		/* --------Old way----------
		const description = form.description.value;
		const date = form.date.value;
		const amount = form.amount.value;

		console.log(description, date, amount);
		console.log("Gets html element " + form.description);
		console.log("Gets actual value " + form.description.value);
		*/

		// ---------------------------------------------------------

		/* 
			New to ES6, another way to extract
			form values.
			description: {value: desc},
			desc = form.description.value;
		*/
		const {
			description: {value: desc},
			date: {value: dat},
			amount: {value: am}
		} = form;
		console.log(desc, dat, am);

		console.log(this);

		this.model.addExpense({
			description: desc,
			date: dat,
			amount: am
		});
	}

	removeExpense(event) {
		console.log('we deleted expense');
		const button = event.currentTarget;
		const expenseID = button.attributes["data-id"].value;

		console.log(expenseID);
		this.model.removeExpense(expenseID);
	}
}