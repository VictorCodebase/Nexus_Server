const upload = require("../config/multerConfig");

const uploadPaper = (req, res) => {
	upload.single("paper")(req, res, async (err) => {
		if (err) {
			return res.status(400).json({
				error: "File upload failed",
				details: err.message,
			});
		}

		if (!req.file) {
			return res.status(400).json({error: "No file uploaded"})
		}

		const fileUrl = req.file.location //url of uploaded file
		console.log("File upload location: ", fileUrl)

		res.status(200).json({message: "paper uploaded successfully"})
	});
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
