const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.json({ limit: '5mb' }));
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
	res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
	const commentId = randomBytes(4).toString('hex');
	const { content } = req.body;

	const comments = commentsByPostId[req.params.id] || [];
	comments.push({
		commentId,
		content,
		status: 'pending',
	});
	commentsByPostId[req.params.id] = comments;

	await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentCreated',
      data: {
			commentId,
			content,
			postId: req.params.id,
			status: 'pending',
		},
	});

	// res.status(201).json({
	// 	commentsByPostId,
	// });
	res.status(201).send(comments)
});

app.post('/events', (req, res) => {
	console.log('Event received!', req.body.type);

	const { type, data } = req.body;

	if (type === 'CommentModerated') {
		const { commentId, status, postId, content } = data;

		//update local comment storage with new status
		const comments = commentsByPostId[postId];
		const comment = comments.find(comment => comment.commentId === commentId);
		comment.status = status;

		//send update to other services
		axios.post('http://event-bus-srv:4005/events', {
			type: 'CommentUpdated',
			data: {
				commentId,
				postId,
				status,
				content
			}
		})
	}

	res.send({});
});

app.listen(4001, () => {
	console.log('Listening to port 4001...');
});
