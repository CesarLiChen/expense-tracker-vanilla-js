console.log("view.js loaded");

// Creating class in new ES6 way.
class ExpenseView {
	constructor(){
		console.log("A new ExpenseView obj has been created");
		this.DOM = this.selectDOMElements();
	}

	selectDOMElements() {
		return {
			expenseForm: document.getElementById("new-expense-form"),
		};
	}

	getDOM() {
		// return this.DOM; use below for better shielding.
		// This is done so other code cannot manipulate it.
		// All keys/values from this.DOM are put into the
		//new empty '{}' object.
		return Object.assign({}, this.DOM);
	}
}