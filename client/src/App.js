import React from 'react';
import PostCreate from './PostCreate';
import PostList from './PostList';

const App = () => {
	return (
		<div className='container'>
			<h1>Create Post</h1>
			<PostCreate />
			<hr />
			<h1>Posts</h1>
			<PostList />
			<div>
				<button>get event list</button>
				
			</div>
		</div>
	);
};

export default App;
