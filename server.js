const express = require("express");
const app = express();

const port = 5000;


app.get("/api", (req, res) => {
    const message = req.query.message;
    res.json({
        "Server response": "Server reached successfully",
        "client message": message || "No message received from client"
    })
})

app.get("/api/research_papers", (req, res) => {
    const temp_res = [
		{
			id: 1,
			title: "AI in Healthcare: Revolutionizing Diagnosis",
			author: "Dr. John Doe",
			category: "Artificial Intelligence",
			abstract: "Exploring how AI is transforming healthcare diagnostics...",
		},
		{
			id: 2,
			title: "Blockchain for Secure Transactions",
			author: "Jane Smith",
			category: "Blockchain",
			abstract: "An in-depth look at the role of blockchain in secure transactions...",
		},
    ];

    res.json(temp_res)
})



app.get("/test_db", (req, res) => {
    const message = req.query.message;
    
})

app.listen(port, () => {
	console.log("Node server running on port", port);
});
