const db = require("../config/dbConfig");

const createPaper = (category_id, paper_name, file_url, description, meta = null) => {
	const deleted = 0;
	const stmt = db.prepare("INSERT INTO papers (category_id, paper_name, file_url, description, meta, deleted) VALUES(?,?,?,?,?,?)");

	return stmt.run(category_id, paper_name, file_url, description, meta, deleted);
};

const getPapers = (filters) => {
	let query = "SELECT * FROM papers WHERE 1=1";
	const params = [];

	if (filters.category) {
		query += " AND category_id = ?";
		params.push(filters.category);
	}

	if (filters.tag) {
		query += " AND tag_id = ?";
		params.push(filters.tag);
	}

	if (filters.q) {
		query += " AND (title LIKE ? OR description LIKE ?)";
		params.push(`%${filters.q}%`, `%${filters.q}%`);
	}

	const stmt = db.prepare(query);
	return stmt.all(...params);
};

module.exports = {
	createPaper,
    getPapers
};
