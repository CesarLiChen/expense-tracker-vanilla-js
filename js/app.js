console.log("app.js loaded");

/*
	Assign view to variable so we can use it.
	Use const, so it can not be changed.

	model before view, both before controller.
	'view' needs to know about 'model'.
*/
const model = new ExpenseModel();
const view = new ExpenseView(model);
const controller = new ExpenseController(view, model);

console.log(view.getDOM());