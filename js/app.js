console.log("app.js loaded");

// Assign view to variable so we can use it.
// Use const, so it can not be used.
const view = new ExpenseView();
const controller = new ExpenseController(view);

console.log(view.getDOM());