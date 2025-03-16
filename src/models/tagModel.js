const db = require("../config/dbConfig");


const createTag = (field, tag) => {
	const stmt = db.prepare("INSERT INTO tags (field, tag) VALUES(?, ?)");
	return stmt.run(field, tag)
};

module.exports = {
	createTag,
};
