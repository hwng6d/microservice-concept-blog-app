import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventList = () => {
	const [events, setEvents] = useState({});

	const fetchEvents = async () => {
		// const result = await axios.get('http://localhost:4002/posts');
		const result = await axios.get('http://blog.com/...');

		setEvents(result.data);
	};

	useEffect(() => {
		fetchEvents();
	}, []);

	const renderedEvents = Object.values(events).map((event) => {
		return (
			<div
				className='card'
				style={{ width: '30%', marginBottom: '20px' }}
				key={post.id}>
				<div className='card-body'>
					<div>{ event }</div>
				</div>
			</div>
		);
	});

	return (
		<div className='d-flex flex-row flex-wrap justify-content-between'>
			{renderedEvents}
		</div>
	);
}

export default EventList;
