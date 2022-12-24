/*
	Part of code that handles DATA in our 
	application. Our data are the expenses.
*/

class ExpenseModel {
	constructor() {
		this.expenses = [];
	}

	addExpense(expense) {
		this.expenses.push(expense);
	}
}