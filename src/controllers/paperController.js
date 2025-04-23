const upload = require("../config/multerConfig");
const paperModel = require("../models/paperModel");

const uploadPaper = (req, res) => {
	if (!req.file) {
		return res.status(400).json({ error: "No file attatched" });
	}

	const fileurl = req.file.location;
	console.log("file upload location: ", fileurl);

	res.status(200).json({
		message: "paper uploaded successfully",
		fileurl: fileurl,
	});
};

const localUploadPaper = (req, res) => {
	if (!req.file) {
		return res.status(400).json({ error: "No file attatched" });
	}

	const fileUrl = req.fileUrl;
	const fileName = req.body.name;
	const category = req.body.category;
	const publisher = req.body.publisher;
	let coauthors = req.body.coauthors || []
	let tags = req.body.tags || [];
	const description = req.body.description;
	const meta = req.body.meta;

	console.log(req.body);

	if (tags) tags = JSON.parse(tags);
	if (coauthors) coauthors = JSON.parse(coauthors)

	if (!fileName) return res.status(400).json({ error: "expected file name in the body as: name:<file_name>" });
	if (!category) return res.status(400).json({ error: "expected file category in the body as: category:<1>" });
	if (!description) return res.status(400).json({ error: "expected file description in the body as: description:<file_description>" });
	if (!publisher) return res.status(400).json({ error: "expected file publisher in the body as: publisher:<1>" });
	if (!Array.isArray(tags)) return res.status(400).json({ error: "tags should be an array" });
	if (!Array.isArray(coauthors)) return res.status(400).json({error: "coathors should be an array"})
	if (tags.length > 10) return res.status(400).json({ error: "Maximum number of tags associatable to a paper exceeded" });

	const paper = paperModel.createPaper(category, publisher, fileName, fileUrl, description, meta, tags, coauthors);

	if (!paper) {
		console.error("Paper creation failed: ", paper);
		return res.status(500).json({ error: "Error occured creating file" });
	} else {
		return res.status(200).json({ message: "Success" });
	}
};

const getPapers = (req, res) => {
	try {
		const { id, category, tag, publisher_id, author_id, q, offset, limit } = req.query;

		let parsedOffset = parseInt(offset);
		let parsedLimit = parseInt(limit);
		if (isNaN(parsedLimit)) parsedLimit = 30; //default
		if (isNaN(parsedOffset)) parsedOffset = 0; //default

		//? Should you change the hardlimit from 30
		//? remember to change the limit in paperModel too :)
		const paginationLimit = 30;

		if (parsedLimit > paginationLimit) return res.status(400).json({ error: `limit cannot exceed ${paginationLimit} a request` });

		const filters = { id, category, tag, publisher_id, author_id, q };
		const papers = paperModel.getPapers(filters, parsedOffset, parsedLimit);

		if (papers === null) return res.status(404).json({ error: "No such resource found" });
		res.status(200).json({ data: papers, offset: offset, limit, limit });
	} catch (error) {
		console.error("Error fetching papers: ", error);
		res.status(500).json({ message: "operation failed" });
	}
};



const getPaperById = (req, res) => {
	message = req.query.message;
	temp_res = { "message": "Endpoint depreciated, do paper filtering"};
	res.status(500).json(temp_res);
};

const updatePaper = (req, res) => {
	const paperId = req.params.id;

	const test_updated = {
		paperId: 1,
	};

	if (!test_updated) {
		return res.status(404).json({ message: "resource does not exist" });
	}

	res.status(200).json({ message: "paper updated successfully" });
};

const deletePaper = (req, res) => {
	const paperId = req.params.id;

	const test_deleted = {
		paperId: 1,
	}; // TODO: run function to delete

	if (!test_deleted) {
		return res.status(404).json({ message: "resource does not exist" });
	}

	res.status(200).json({ message: "Paper deleted successfully" });
};

module.exports = {
	uploadPaper,
	localUploadPaper,
	getPapers,
	getPaperById,
	updatePaper,
	deletePaper,
};
