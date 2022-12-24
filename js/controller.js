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
		event.preventDefault();

		console.log("form submitted");
	}
}