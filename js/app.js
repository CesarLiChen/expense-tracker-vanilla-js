console.log("app.js loaded");

// Assign view to variable so we can use it.
// Use const, so it can not be changed.
const view = new ExpenseView();
const model = new ExpenseModel();
const controller = new ExpenseController(view, model);

console.log(view.getDOM());