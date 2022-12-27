/*
	Part of code that handles DATA in our 
	application. Our data are the expenses.
*/

class ExpenseModel {
	constructor(db) {
		console.log("model obj has been created");
		this.expenses = db.all(); //this.expenses = []; <- Before
		this.subscribers = [];

		this.db = db;
	}

	all() {

		/*
			NOT: return this.expenses;
			We do not want to return the array "as is" since others
			can change things in it.

			ES6, spread operator. Creates a copy of the array so
			client doesn't have access to original one.
		*/
		return [...this.expenses];
	}

	addExpense(expense) {
		expense.id = this.generateId();

		this.expenses.push(expense);
		this.db.add(expense);

		this.subscribers.forEach( (subscriber) => {
			subscriber.notify();
		});
	}

	subscribe(subscriber) {
		this.subscribers.push(subscriber);
		
		subscriber.notify();
	}

	generateId() {
		// Each unique ID will be a timestamp.
		const timestamp = new Date().getTime();

		return JSON.stringify(timestamp);
	}
}