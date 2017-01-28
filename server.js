const express       = require('express');
const MongoClient   = require('mongodb').MongoClient;
const bodyParser    = require('body-parser');
const dotenv        = require("dotenv").config();
const mongoUrl      = process.env.MONGO_URL;

const app           = express();

const port          = 3000;

app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(mongoUrl, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);

  app.listen(process.env.PORT || port, () => {
    console.log('We are live on ' + port);
  });
});
