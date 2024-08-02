require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const postsRouter = require('./routes/posts');

const mongoDBURI = process.env.MONGODB_URI;

mongoose.connect(mongoDBURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.use(bodyParser.json());
app.use('/posts', postsRouter);
app.use(express.static('public')); // Serve static files from the public directory

module.exports = app;
