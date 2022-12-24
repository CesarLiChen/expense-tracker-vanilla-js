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

	notify() {
		console.log("Model has been updated");
	}
}