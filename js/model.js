/*
	Part of code that handles DATA in our 
	application. Our data are the expenses.
*/

class ExpenseModel {
	constructor() {
		console.log("model obj has been created");
		this.expenses = [];
		this.subscribers = [];
	}

	all() {

		/*
			NOT: return this.expenses;
			We do not want to return the array as is since others
			can change things in it.

			ES6, spread operator. Creates a copy of the array so
			client doesn't have access to original one.
		*/
		return [...this.expenses];
	}

	addExpense(expense) {
		this.expenses.push(expense);

		this.subscribers.forEach( (subscriber) => {
			subscriber.notify();
		});
	}

	subscribe(subscriber) {
		this.subscribers.push(subscriber);
	}
}