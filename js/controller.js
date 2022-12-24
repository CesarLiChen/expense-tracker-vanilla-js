/* 
	Part of the code that connects
	the 'view' with the 'model'.
*/

class ExpenseController {
	constructor(view) {
		console.log("controller obj has been created");
		this.DOM = view.getDOM();

		this.setUpEventHandlers();
	}

	setUpEventHandlers() {
		this.DOM.expenseForm.addEventListener("submit", this.addExpense);
	}

	// some people named it 'e', 'evt'
	addExpense(event) {
		// Prevent default so it doesn't refresh page.
		event.preventDefault();

		const form = event.currentTarget; //instead of event.target

		const description = form.description.value;
		const date = form.date.value;
		const amount = form.amount.value;

		console.log(description, date, amount);
		console.log("Gets html element " + form.description);
		console.log("Gets actual value " + form.description.value);
		console.log(form);
	}
}