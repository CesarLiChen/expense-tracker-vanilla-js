console.log("app.js loaded");

/*
	Assign view to variable so we can use it.
	Use const, so it can not be changed.

	model before view, both before controller.
	'view' needs to know about 'model'.
*/
const db = new DB();
const model = new ExpenseModel(db);
const view = new ExpenseView(model);
const controller = new ExpenseController(view, model);