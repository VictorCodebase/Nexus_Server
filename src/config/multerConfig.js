const multer = require("multer");
const multerS3 = require("multer-s3");
const s3 = require("./b2Config");
const path = require("path");
const destinationDirectory = "../uploads"

const upload = multer({
	storage: multerS3({
		s3: s3,
		bucket: process.env.B2_BUCKET_NAME,
		acl: "public-read",
		key: function (req, file, cb) {
			const filename = `research-papers/${Date.now()}-${file.originalname}`;
			cb(null, filename);
		},
	}),
});

const localstore = multer({
	storage: multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, path.join(__dirname, destinationDirectory));
		},
		filename: function (req, file, cb) {
			const filename = Date.now() + "-" + file.originalname;
			console.log("Uploaded file: ", filename)
			req.fileUrl = `${destinationDirectory}/${filename}`;
			cb(null, filename); // Unique filename
		},
	}),
});
module.exports = {
	upload,
	localstore,
};
