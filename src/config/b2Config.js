const {S3Client} = require("@aws-sdk/client-s3")
require("dotenv").config()

const s3 = new S3Client({
	endpoint: process.env.B2_ENDPOINT,
	region: "us-west-004",
	credentials: {
		accessKeyId: process.env.B2_KEY_ID,
		secretAccessKey: process.env.B2_APPLICATION_KEY,
	},
});


// An IIFE? Immediately Invoked Async Function: Runs immediately the file is imported anywhere (with require)

(async () => {
    try {
        await s3.config.credentials();
        console.log("Connected to Backblaze B2 successfully")
    }catch(error){
        console.error("Error connection to B2". error)
    }
})();

module.exports = s3
