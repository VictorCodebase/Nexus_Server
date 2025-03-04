const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

const register = (req, res) => {
	const { fname, lname, email , password } = req.body;
	const role = 'Author' 
	if (userModel.readUserByMail(email)) {
		return res.status(400).json({ message: "User email already exists" });
	}
	
	userModel.createUser(fname, lname, email, role, password);
	res.status(201).json({ message: "Success: User register" });
};

const registerAdmin = (req, res) => {
	const {fname, lname, email, password} = req.body;

	const role = 'Admin'
	if (userModel.readUserByMail(email)) {
		return res.status(400).json({ message: "User email aready exists" });
	}

	userModel.createUser(fname, lname, email, role, password)
	res.status(201).json({message: "Success: Admin registered successfully"})
}

const login = (req, res) => {
	const { email, password } = req.body;
	const user = userModel.readUserByMail(email);

	if (!user || !bcrypt.compareSync(password, user.password)){
		return res.status(401).json({message: "Invalid credentials"})
	}

	const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

	res.status(200).json({ token });
};

const logout = (req, res) => {
	// TODO: implement logout method
	message = req.query.message;
	temp_res = { message: "server reached, the called function has not been implemented yet", "client message": message || "no message" };
	res.status(500).json(temp_res);
};

const getUser = (req, res) => {
	const user = userModel.readUserById(req.user.id)

	if (!user) {
		return res.status(404).json({message: "User does not exist"})
	}
};

module.exports = {
	register,
	login,
	logout,
	getUser,
	registerAdmin
};
