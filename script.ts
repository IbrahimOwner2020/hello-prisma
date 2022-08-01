import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
	// ADDING USER TO DATABASE
	const createUser = await prisma.user.create({
		data: {
			name: "Some User",
			email: "unknown@gmail.com",
		},
	});

	//  CREATING A USER WITH POST
	const createUserWithPost = await prisma.user.create({
		data: {
			name: "Steve Jobs",
			email: "sjobs@gmail.com",
			posts: {
				create: {
					title: "Hello World",
				},
			},
		},
	});

	// CREATING A POST WITH USER
	const post = await prisma.post.create({
		data: {
			title: "My first post",
			content: "This is my first post for testing prisma client",
			authorId: 1,
		},
	});

	// GETTING ALL USERS FROM DATABASE
	const users = await prisma.user.findMany();

	// GETTING A USER WITH POSTS
	const userWithPost = await prisma.user.findMany({
		include: {
			posts: true,
		},
	});

	// GETTING A POST WITH AUTHOR
	const postWithAuthor = await prisma.post.findMany({
		include: {
			author: true,
		},
	});

	// UPDATING A USER
	const updatedUser = await prisma.user.update({
		where: {
			id: 1,
		},
		data: {
			name: "KidIbra",
		},
	});

	// UPDATEING A POST
	const updatedPost = await prisma.post.update({
		where: {
			id: 2,
		},
		data: {
			published: true,
		},
	});

	// DELETING A USER
	const deletedUser = await prisma.user.delete({
		where: {
			id: 2,
		},
	});

	// DELETING A POST
	const deletedPost = await prisma.post.delete({
		where: {
			id: 2,
		},
	});

	// GETTING A SINGLE USER
	const user = await prisma.user.findUnique({
		where: {
			id: 1,
		},
	});
};

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (error) => {
		console.log(error);
		prisma.$disconnect();
		process.exit(1);
	});
