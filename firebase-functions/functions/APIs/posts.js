//posts.js

const { db } = require('../util/admin');
const cors = require('cors')({origin: true});

exports.getAllPosts = (request, response) => {
	cors(request, response, () => {
		db
			.collection('posts')
			.orderBy('createdAt', 'desc')
			.get()
			.then((data) => {
				let posts = [data.size];
				data.forEach((doc) => {
					posts.push({
						postId: doc.id,
						title: doc.data().title,
						body: doc.data().body,
						createdAt: doc.data().createdAt,
					});
				});
				return response.json(posts);
			})
			.catch((err) => {
				console.error(err);
				return response.status(500).json({ error: err.code});
			});
	})
};

//posts.js

exports.postOnePost = (request, response) => {
	cors(request, response, () => {

		if (request.body.body.trim() === '') {
			return response.status(400).json({ body: 'Must not be empty' });
		}
		
		if(request.body.title.trim() === '') {
			return response.status(400).json({ title: 'Must not be empty' });
		}
		
		const newPostItem = {
			title: request.body.title,
			body: request.body.body,
			createdAt: new Date().toISOString()
		}
		db
			.collection('posts')
			.add(newPostItem)
			.then((doc)=>{
				const responsePostItem = newPostItem;
				responsePostItem.id = doc.id;
				return response.json(responsePostItem);
			})
			.catch((err) => {
				response.status(500).json({ error: 'Something went wrong' });
				console.error(err);
			});
	})
};