//index.js

const functions = require('firebase-functions');
const app = require('express')();
const {getAllPosts, postOnePost} = require('./APIs/posts')
const cors = require('cors')({origin: true});
app.get('/posts', getAllPosts);
app.post('/posts', postOnePost);
app.use(cors);
exports.api = functions.https.onRequest(app);