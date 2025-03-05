const db = require("../config/db");

const createCategory = (category) => {
	const lower = category.toLowerCase();
	const stmt = db.prepare("INSERT INTO categories (category) VALUES (?)");
	return stmt.run(lower);
};

const readCategoryByName = (name) => {
	const lower = name.toLowerCase();
	const stmt = db.prepare("SELECT category FROM categories WHERE category = ?");

	return stmt.get(lower); 
};

module.exports = {
	createCategory,
	readCategoryByName,
};
