const tagModel = require("../models/tagModel");

const getTags = (req, res) => {
	// TODO: implement getTags method
	message = req.query.message;
	temp_res = { message: "server reached, the called function has not been implemented yet", "client message": message || "no message" };
	res.status(500).json(temp_res);
};

const addTags = async (req, res) => {
	//? Accepts multiple tags in a related field
	const { field, tags } = req.body;
	let successfullyAddedTags = [];

	if (!field || field.length === 0) {
		return res.status(400).json({ error: "the key 'field' is either empty or not included" });
	}
	if (!tags) {
		return res.status(400).json({ error: "the key 'tags' is required in the body" });
	}
	if (!Array.isArray(tags)) {
		return res.status(400).json({ error: "the key 'tags' only accepts arrays as value" });
	}
	if (tags.length === 0) {
		return res.status(400).json({ error: "the key 'tags' cannot be an empty array" });
	}

	try {
		for (const tag of tags) {
			await tagModel.createTag(field, tag);
			successfullyAddedTags.push({ tag, field });
		}

		return res.status(200).json({ message: "Tags successfully added", addedTags: successfullyAddedTags });
	} catch (error) {
		console.error("Error adding tags: ", error);
		return res.status(500).json({ error: `Operation failed. Only the following tags could be added: ${JSON.stringify(successfullyAddedTags)}` });
	}
};

module.exports = {
	getTags,
	addTags,
};
