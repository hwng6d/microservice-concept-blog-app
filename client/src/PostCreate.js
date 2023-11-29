import React, { useState } from 'react';
import axios from 'axios';

export default function PostCreate() {
	const [title, setTitle] = useState('');

	const onSubmit = async (e) => {
		e.preventDefault();

		// await axios.post('http://localhost:4000/posts', { title });
		await axios.post('http://blog.com/posts/create', { title });

		setTitle('');
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label>Title</label>
					<input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className='form-control'
					/>
				</div>
				<button type='submit' className='btn btn-primary'>
					Submit
				</button>
			</form>
		</div>
	);
}
