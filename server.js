'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');

const app = express();
app.use(cors());

mongoose.connect(process.env.DB_URL);

const Books = require('./models/book');

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const PORT = process.env.PORT || 3002;

app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
});

app.get('/books', getBook);

async function getBook(req, res, next) {
  try {
    let results = await Books.find();
    console.log('rESULTS: ', results);
    res.status(200).send(results);
  } catch (err) {
    next(err)
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

app.use((error, request, response, next) => {
  res.status(500).send(error.message);
});

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
