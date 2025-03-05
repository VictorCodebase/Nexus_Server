const { readCategoryByName, createCategory } = require("../models/categoryModel");

const getCategories = (req, res) => {
	// TODO: implement getCategories method
	message = req.query.message;
	temp_res = { "server res: ": "server reached, the called function has not been implemented yet", "client message": message || "no message" };
	res.status(501).json(temp_res);
};

const addCategories = (req, res) => {
	const { category } = req.body;
	if (readCategoryByName(category)){
		return res.status(409).json({message: "Category exists"})
	}
	
	if (createCategory(category)) {
		return res.status(200).json({message: "New category added"})
	}

	return res.status(500).json({message: "Failed to add new category"})
};

module.exports = {
	getCategories,
	addCategories,
};
