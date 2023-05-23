'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL);

const Book = require('./models/book');

async function seed() {
  await Book.create({
    title: 'Rabbit by Patricia Williams',
    description: 'In many ways Patricia Williams\' has led an extraordinary life. Raised in a family of alcoholics and hustlers, she was at ground zero when the crack epidemic of the 1980s hit the impoverished neighborhoods of inner city Atlanta. Her mother taught her to roll drunks by the time she was eight; if they were hungry enough she and her siblings would go to the ER and wait for the candy stripers to come through with sandwiches for waiting families. And that\'s just the tip of the iceberg. In the third grade Williams—nicknamed Rabbit—first saw the possibility of a different life, thanks to a teacher who took a sympathetic interest. But the rules and role models in the rest of her world had a stronger pull, and soon enough Williams began to model the success she saw every day—in the drug dealers. As you read Williams\' memoir it\'s impossible not to be shocked and bewildered. But you will also feel compassion. And Williams not only allows you to laugh, she makes it damn near impossible not to. Her wit and levity, hand-in-hand with hardship, mistakes, and self-discovery, makes Williams\' memoir, Rabbit, impressive and memorable.',
    status: true
  });
  console.log('Rabbit was added to database');

  await Book.create({
    title: 'A Promised Land by Barack Obama',
    description: 'A memoir written by the 44th president of the United States.',
    status: true
  });
  console.log('A Promised Land was added to database');

  await Book.create({
    title: 'The Bible',
    description: 'It\s the Bible',
    status: true
  });
  console.log('TheBible was added to database');
}
mongoose.disconnect();

seed();