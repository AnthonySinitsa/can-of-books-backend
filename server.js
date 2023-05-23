'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const mongoose = require('mongoose');
// console.nodemonlog(process.env.DB_URL);

const Books = require('./models/book');
const PORT = process.env.PORT || 3002;

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

mongoose.connect(process.env.DB_URL);

app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});

app.get('/books', getBook);
app.post('/books', postBook);
app.delete('/books/:id', deleteBook);

async function getBook(req, res, next) {
  try {
    let results = await Books.find();
    console.log('rESULTS: ', results);
    res.status(200).send(results);
  } catch (err) {
    next(err);
  }
}

async function postBook(req, res, next) {
  console.log(req.body)
  try {
    let createdBook = await Books.create(req.body);
    res.status(200).send(createdBook);
  } catch (err) {
    next(err);
  }
}

async function deleteBook(req, res, next) {
  try {
    let id = req.params.id;
    await Books.findByIdAndDelete(id);
    res.send('Book Deleted');
  } catch (err) {
    next(err);
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

// app.get('/test', (request, response) => {
//   response.send('test request received');
// });

app.listen(PORT, () => console.log(`listening on ${PORT}`));
