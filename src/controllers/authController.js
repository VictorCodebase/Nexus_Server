const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const register = (req, res) => {
	const { fname, lname, email, password } = req.body;
	userModel.createUser(fname, lname, email, password);

	res.status(200).json({ message: "Success: User register" });

	const users = userModel.readUsers
	console.log("Users: ", users)
};

const login = (req, res) => {
	const { email, password } = req.body;
	test_user = {
		id: 2,
		role: "author",
		email: "sample@mail.com",
		password: "32fsfsd3232eddd2e32dweedwscr2323e4rfresrw34ouh3freu", //Some hashed value
	};

	if (!test_user || !verifyPassword(password, test_user.password)) {
		return res.status(401).json({ message: "invalid credentials" });
	}

	const token = jwt.sign({ id: test_user.id, role: test_user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

	res.json({ token });
};

const logout = (req, res) => {
	// TODO: implement logout method
	message = req.query.message;
	temp_res = { message: "server reached, the called function has not been implemented yet", "client message": message || "no message" };
	res.status(500).json(temp_res);
};

const getUser = (req, res) => {
	// TODO: implement getUser method
	message = req.query.message;
	temp_res = { message: "server reached, the called function has not been implemented yet", "client message": message || "no message" };
	res.status(500).json(temp_res);
};

module.exports = {
	register,
	login,
	logout,
	getUser,
};

const verifyPassword = (password, userHashedPassword) => {
	// Perform checks of input and hashed value from db
	unhashedPassword = "password";
	if (password !== unhashedPassword) {
		return false;
	}

	return true;
};
