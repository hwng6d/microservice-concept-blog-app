import axios from 'axios';
import React, { useState } from 'react';

function CommentCreate(props) {
	const [content, setContent] = useState('');

	const onSubmit = async (e) => {
		e.preventDefault();

		await axios.post(
			// `http://localhost:4001/posts/${props.postId}/comments`,
			`http://blog.com/posts/${props.postId}/comments`,
			{ content }
		);

		setContent('');
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label>New comment</label>
					<input
						type='text'
						className='form-control'
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
				</div>
				{/* <button type='submit'>Submit</button> */}
				<button className="btn btn-primary">Submit</button>
			</form>
		</div>
	);
}

export default CommentCreate;
