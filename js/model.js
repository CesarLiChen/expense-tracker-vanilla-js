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