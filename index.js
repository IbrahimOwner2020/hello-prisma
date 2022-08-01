const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const app = express();

app.use(express.json());

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

app.post("/create/post", async (req, res) => {
	const data = req.body;
	console.log(data);
	const post = await prisma.post.create({
		data: data,
	});

	res.json({
		message: "Post created",
		data: post,
	});
});

app.get("/users", async (req, res) => {
	await prisma.user
		.findMany()
		.then((users) => {
			res.json({
				message: "Users fetched successfully",
				data: users,
			});
		})
		.catch((error) => {
			res.json(400, {
				message: "Error fetching users",
				data: error,
			});
		});
});

app.get("/users/:id", async (req, res) => {
	const { id } = req.params;

	await prisma.user
		.findUnique({
			where: {
				id,
			},
		})
		.then((user) => {
			res.json({
				message: "User fetched successfully",
				data: user,
			});
		})
		.catch((error) => {
			res.json(500, {
				message: "Error fetching user",
				error: error,
			});
		});
});

app.listen(4000, () => console.log("Server is running on port 4000"));
