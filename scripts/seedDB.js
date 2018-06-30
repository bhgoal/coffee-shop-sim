const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/coffeeShopDB",
  {
    useMongoClient: true
  }
);

const articleSeed = [
  {
    title: "The Dead Zone",
    date: new Date(Date.now()),
    url: "test url"
  },
  {
    title: "Lord of the Flies",
    date: new Date(Date.now()),
    url: "test url"
  },
  {
    title: "The Catcher in the Rye",
    date: new Date(Date.now()),
    url: "test url"
  },
  {
    title: "The Punch Escrow",
    date: new Date(Date.now()),
    url: "test url"
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    date: new Date(Date.now()),
    url: "test url"
  }
];

db.Article
  .remove({})
  .then(() => db.Article.collection.insertMany(articleSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
