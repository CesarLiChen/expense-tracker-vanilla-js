/*
	Part of code that handles DATA in our 
	application. Our data are the expenses.
*/
class InvalidAmountError extends Error {}
class InvalidDateError extends Error {}

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
		expense.date = this.validateDate(expense.date);
		expense.amount = this.validateAmount(expense.amount);

		this.expenses.push(expense);
		this.db.add(expense);

		this.notify();
	}

	editExpense({description, date, amount, id}) {
		const expense = this.expenses.find( (expense) => {
			return expense.id === id;
		});

		expense.description = description;
		expense.date = this.validateDate(date);
		expense.amount = this.validateAmount(amount);

		this.db.edit(expense);
		this.notify();
	}

	removeExpense(expenseID) {
		/* Filter loops through array returns every element
		where a specific function returns TRUE.
		Pretty much creates a new array WITHOUT the expense
		removed and assigns it to the same array name.*/
		this.expenses = this.expenses.filter( (expense) => {
			return expense.id !== expenseID;
		});
		this.db.remove(expenseID);

		this.notify();
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

	notify() {
		this.subscribers.forEach( (subscriber) => {
			subscriber.notify();
		});
	}

	validateAmount(amount) {

		// Converts $49.99 -> 49.99
		if (amount.indexOf("$") === 0) {
			amount = amount.substring(1);
		}

		if (amount.length === 0) throw new InvalidAmountError();

		// 50, 50.1, 50., .10
		const matches = amount.match(/^(\d*)(\.\d{0,2})?$/);

		if (!matches) throw new InvalidAmountError();

		// Amount formating
		let [dollars, cents] = amount.split(".");
		if (dollars.length === 0) dollars = "0";
		if (!cents || cents.length === 0) cents = "00";
		if (cents && cents.length === 1) cents += "0";

		return `${dollars}.${cents}`;
	}

	validateDate(date) {
		const matches = date.match(/^\d{4}\-\d{2}\-\d{2}$/);

		if (!matches) throw new InvalidDateError();

		return date;
	}
}