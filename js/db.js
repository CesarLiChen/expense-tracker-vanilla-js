/*
	Using localStorage for persistence.
	A key-value store.
	E.g.
	localStorage.setItem("name", "Clakr");
	localStorage.getItem("name"); <-Should return Clakr between refreshes
	localStorage.removeItem("name");
*/

class DB {
	all() {
		const expenses = [];

		for (let key in localStorage) {
			const expense = JSON.parse(localStorage.getItem(key));

			expenses.push(expense);
		}
		return expenses;
	}	

	add(expense) {
		localStorage.setItem(expense.id, JSON.stringify(expense));
	}
}