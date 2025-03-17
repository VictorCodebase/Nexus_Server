const db = require("../config/dbConfig");

const createPaper = (category_id, publisher_id, paper_name, file_url, description, meta = null, tags = null, coauthors = null) => {
	const deleted = 0;
	const stmt = db.prepare("INSERT INTO papers (category_id, publisher_id, paper_name, file_url, description, meta, deleted) VALUES(?,?,?,?,?,?,?)");

	const result = stmt.run(category_id, publisher_id, paper_name, file_url, description, meta, deleted);
	if (!result.changes) return null;

	const paper_id = result.lastInsertRowid;

	// Add all associated tags
	try {
		if (tags.length > 0) {
			const tagStmt = db.prepare("INSERT INTO paper_tags (paper_id, tag_id) VALUES (?, ?)");
			const insertMany = db.transaction((tags) => {
				for (const tag_id of tags) {
					tagStmt.run(paper_id, tag_id);
				}
			});
			insertMany(tags);
		}
	} catch (error) {
		throw new Error(`Error adding tags: ${error.message}`);
	}

	// Add all associated co-authors
	try {
		if (coauthors.length > 0) {
			const authorStmt = db.prepare("INSERT INTO author_papers (rauthor_id, rpaper_id) VALUES (?, ?)");
			const allAuthors = new Set([Number(publisher_id), ...coauthors]);

			const insertAuthors = db.transaction((author_ids) => {
				for (const authorId of author_ids) {
					authorStmt.run(authorId, paper_id);
				}
			});
			insertAuthors(allAuthors);
		}
	} catch (error) {
		throw new Error(`Error adding co-authors: ${error.message}`);
	}

	return paper_id;
};

const getPapers = (filters, offset = 0, limit = 30) => {
	let query = `
        SELECT DISTINCT papers.* 
        FROM papers 
        LEFT JOIN paper_tags ON papers.paper_id = paper_tags.paper_id
        LEFT JOIN author_papers ON papers.paper_id = author_papers.rpaper_id
    `;
	const params = [];

	if (limit > 30) {
		throw new Error("Hard limit of 30 documents a time hit");
	}

	let conditions = ["1=1"]; // Ensures correct WHERE clause handling

	try {
		// Filter by Paper ID
		if (filters.id) {
			conditions.push("papers.paper_id = ?");
			params.push(Number(filters.id));
		}

		// Filter by Category
		if (filters.category) {
			conditions.push("papers.category_id = ?");
			params.push(Number(filters.category));
		}

		// Filter by Tag
		if (filters.tag) {
			conditions.push("paper_tags.tag_id = ?");
			params.push(Number(filters.tag));
		}

		// Filter by Publisher
		if (filters.publisher_id) {
			conditions.push("papers.publisher_id = ?");
			params.push(Number(filters.publisher_id));
		}

		// Filter by Author
		if (filters.author_id) {
			conditions.push("author_papers.rauthor_id = ?");
			params.push(Number(filters.author_id));
		}

		// Search Query (Title or Description)
		if (filters.q) {
			conditions.push("(papers.title LIKE ? OR papers.description LIKE ?)");
			params.push(`%${String(filters.q)}%`, `%${String(filters.q)}%`);
		}

		// Append WHERE conditions correctly
		query += ` WHERE ${conditions.join(" AND ")}`;

		// Pagination
		query += " ORDER BY papers.created_at DESC LIMIT ? OFFSET ?";
		params.push(limit, offset);

		// Execute query
		const stmt = db.prepare(query);
		return stmt.all(...params);
	} catch (error) {
		console.error("Error filtering papers:", error);
		return null;
	}
};


module.exports = {
	createPaper,
	getPapers,
};
