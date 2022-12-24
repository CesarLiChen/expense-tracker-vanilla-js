/*
	Part of code that handles DATA in our 
	application. Our data are the expenses.
*/

class ExpenseModel {
	constructor() {
		console.log("model obj has been created");
		this.expenses = [];
	}

	addExpense(expense) {
		this.expenses.push(expense);
	}
}