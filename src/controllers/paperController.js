const upload = require("../config/multerConfig");

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

const getPapers = (req, res) => {
	// TODO: implement getPaper method
	message = req.query.message;
	temp_res = { "server res: ": "server reached, the called function has not been implemented yet", "client message": message || "no message" };
	res.status(500).json(temp_res);
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
	getPapers,
	getPaperById,
	updatePaper,
	deletePaper,
};
