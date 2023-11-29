const express = require('express');
const cors = require('cors');
const axios = require('axios')

const app = express();

app.use(cors());
app.use(express.json({ limit: '5mb' }));

const posts = {};

const handleEvent = (type, data) => {
	if (type === "PostCreated") {
		const { id, title } = data;
		posts[id] = { id, title, comments: [] };
	}

	if (type === "CommentCreated") {
		const { commentId, content, postId, status } = data;

		posts[postId].comments.push({ commentId, content, status });
	}

	if (type === "CommentUpdated") {
		const { commentId, postId, content, status } = data;

		//update 2nd storage of post system
		const post = posts[postId];
		const comment = post.comments.find(comment => comment.commentId === commentId)

		comment.status = status;
		comment.content = content;

		posts[postId].comments[commentId] = comment;
	}
};

app.get('/posts', (req, res) => {
	res.send(posts);
});

app.post('/events', (req, res) => {
	const { type, data } = req.body;

	handleEvent(type, data);

	console.log(posts);

	res.send({});
});

app.listen(4002, async () => {
	console.log('Listening on port 4002 Query...');

	try {
		const res = await axios.get("http://event-bus-srv:4005/events");

		for (let event of res.data) {
			console.log("Processing event:", event.type);

			handleEvent(event.type, event.data);
		}
	} catch (error) {
		console.log(error.message);
	}
});
