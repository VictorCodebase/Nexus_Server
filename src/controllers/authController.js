const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

const register = (req, res) => {
	const { fname, lname, email , password } = req.body;
	const role = 'Author' //
	if (userModel.readUser(email)){
		return res.status(400).json({message: "User email already exists"})
	}

	userModel.createUser(fname, lname, email, role, password);
	res.status(201).json({ message: "Success: User register" });
};

const registerAdmin = (req, res) => {
	const {fname, lname, email, password} = req.body;

	const role = 'Admin'
	if (userModel.readUser(email)){
		return res.status(400).json({message: 'User email aready exists'})
	}

	userModel.createUser(fname, lname, email, role, admin)
}

const login = (req, res) => {
	const { email, password } = req.body;
	test_user = {
		id: 2,
		role: "author",
		email: "sample@mail.com",
		password: "32fsfsd3232eddd2e32dweedwscr2323e4rfresrw34ouh3freu", //Some hashed value
	};
	const user = userModel.readUser(email)

	if (!user || !bcrypt.compareSync(password, user.password)){
		return res.status(401).json({message: "Invalid credentials"})
	}

	const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

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
	registerAdmin
};
