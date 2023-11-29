const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json({ limit: '5mb' }));

app.post('/events', async (req, res) => {
	const { type, data } = req.body;

	if (type === 'CommentCreated') {
		const status = data.content.includes('orange')
			? 'rejected'
			: 'approved';

		await axios.post('http://event-bus-srv:4005/events', {
			type: 'CommentModerated',
			data: {
				commentId: data.commentId,
				content: data.content,
				postId: data.postId,
				status,
			},
		});
	}

	res.send({});
});

app.listen(4003, () => {
	console.log('Listening on port 4003...!');
});
