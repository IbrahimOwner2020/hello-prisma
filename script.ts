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

	console.log(createUser);

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

	console.log(createUserWithPost);

	// CREATING A POST WITH USER
	const post = await prisma.post.create({
		data: {
			title: "My first post",
			content: "This is my first post for testing prisma client",
			authorId: "62e79a0282b03751994e67ee",
		},
	});

	console.log(post);

	// GETTING ALL USERS FROM DATABASE
	const users = await prisma.user.findMany();
	console.log(users);

	// GETTING A USER WITH POSTS
	const userWithPost = await prisma.user.findMany({
		include: {
			posts: true,
		},
	});

	console.log(userWithPost);

	// GETTING A POST WITH AUTHOR
	const postWithAuthor = await prisma.post.findMany({
		include: {
			author: true,
		},
	});

	console.log(postWithAuthor);

	// UPDATING A USER
	const updatedUser = await prisma.user.update({
		where: {
			id: "62e79a0282b03751994e67ee",
		},
		data: {
			name: "KidIbra",
			email: "kidibra2020@gmail.com",
		},
	});

	console.log(updatedUser);

	// UPDATEING A POST
	const updatedPost = await prisma.post.update({
		where: {
			id: "62e79b513ab1865641300bd3",
		},
		data: {
			published: true,
		},
	});

	console.log(updatedPost);

	// DELETING A USER
	const deletedUser = await prisma.user.delete({
		where: {
			id: "62e79ae626bf1eb09e36f064",
		},
	});

	console.log(deletedUser);

	// DELETING A POST
	const deletedPost = await prisma.post.delete({
		where: {
			id: "62e79ae726bf1eb09e36f065",
		},
	});

	console.log(deletedPost);

	// GETTING A SINGLE USER
	const user = await prisma.user.findUnique({
		where: {
			id: "62e79a0282b03751994e67ee",
		},
		include: {
			posts: true,
		},
	});

	console.log(user);
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
