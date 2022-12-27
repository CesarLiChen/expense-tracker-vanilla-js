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

		/* 1st way
		for (let key in localStorage) {
			// If statement skips: setItem, getItem,
			// removeItem, clear, key, length 
			if (!localStorage.hasOwnProperty(key)) {
				continue;
			}
			const expense = JSON.parse(localStorage.getItem(key));
			expenses.push(expense);
		}
		*/
	// ---------------------------------------------------
		/* 2nd way
			Object.keys only returns keys that belong to
			object, ignoring the prototype (getItem, removeItem, etc.)
			
			'of' returns actual values.
			'in' returns index of array.
		*/
		let keys = Object.keys(localStorage);
		for (let key of keys) {
			const expense = JSON.parse(localStorage.getItem(key));

			expenses.push(expense);
		}

		return expenses;
	}	

	add(expense) {
		localStorage.setItem(expense.id, JSON.stringify(expense));
	}
}