const express       = require('express');
const MongoClient   = require('mongodb').MongoClient;
const bodyParser    = require('body-parser');
const dotenv        = require("dotenv").config();
const path          = require("path");
const mongoUrl      = process.env.MONGO_URL;

const app           = express();

const port          = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

MongoClient.connect(mongoUrl, (err, database) => {
  if (err) return console.log(err)
  require('./app/routes')(app, database);

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  app.listen(process.env.PORT || port, () => {
    console.log('We are live on ' + port);
  });
});
