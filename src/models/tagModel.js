const db = require("../config/dbConfig");

// TODO: Confirm whether tags are still a thing
const createTag = (tag) => {
	const stmt = db.prepare("DROP TABLE papers");
};

module.exports = {
	createTag,
};
