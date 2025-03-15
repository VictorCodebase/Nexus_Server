const upload = require("../config/multerConfig");
const paperModel = require("../models/paperModel")

const uploadPaper = (req, res) => {

	if (!req.file) {
		return res.status(400).json({error: "No file attatched"})
	}

	const fileurl = req.file.location
	console.log("file upload location: ", fileurl)

	res.status(200).json({
		message: "page uploaded successfully",
		fileurl: fileurl
	})
};

const localUploadPaper = (req, res) => {
	if (!req.file) {
		return res.status(400).json({ error: "No file attatched" });
	}

	const fileUrl = req.fileUrl;
	const fileName = req.body.name
	const category = req.body.category
	const description = req.body.description;
	const meta = req.body.meta;

	if (!fileName) return res.status(400).json({message: "expected file name in the body as: name:<file_name>"})
	if (!category) return res.status(400).json({ message: "expected file category in the body as: category:<file_category>" });
	if (!description) return res.status(400).json({ message: "expected file description in the body as: description:<file_description>" });


	const paper = paperModel.createPaper(
		category,
		fileName,
		fileUrl,
		description,
		meta
	)

	if (!paper){
		console.error("Paper not found (file creation): ", paper)
		return res.status(500).json({message: "Error occured creating file"})
	}
	else{
		return res.status(200).json({message: "Success"})
	}

};

const getPapers = (req, res) => {
	const {category, tag, q} = req.query
	 
};

const getPaperById = (req, res) => {
	// TODO: implement getPaperById method
	message = req.query.message;
	temp_res = { "server res: ": "server reached, the called function has not been implemented yet", "client message": message || "no message" };
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
