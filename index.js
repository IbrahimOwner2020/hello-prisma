const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();

app.get("/posts", async (req, res) => {
	const posts = await prisma.post.findMany();

	res.json(posts);
});

app.get("/posts/:id", async (req, res) => {
	const { id } = req.params;

	const post = await prisma.post.findUnique({
		where: {
			id,
		},
	});

	res.json(post);
});

// GETTING UNDEFINED FROM REQ.BODY
// app.post("/create/post", async (req, res) => {
// 	console.log(req.body);
// 	// const data = req.body;
// 	// console.log(data);
// 	// const post = await prisma.post.create({
// 	// 	data: data,
// 	// });

// 	res.json("Send completed");
// });

app.listen(4000, () => console.log("Server is running on port 4000"));
