const bcrypt        = require("bcrypt");

//bcrypt.compareSync(myPlaintextPassword, hash)

module.exports = function(app, db) {
  app.get('/user', (req, res) => {
    //find all polls
    db.collection('users').find().toArray((err, result) => {
      if (err) {
        res.send({'error': 'Cannot find user'});
      } else {
        res.send(result);
      }
    });

    console.log(req.body);
    res.send('Hello')
  });

  app.post('/user', (req, res) => {
    const hashPwd = bcrypt.hashSync(req.body.password, 10);
    const user = {username:req.body.username,hash:hashPwd};

    db.collection('users').insert(user, (err, result) => {
      if(err) {
        if(err.code==11000) {
          res.send({'error': 'User already exists'});
        } else {
          res.send({'error': 'Error in creating a new User'});
        }
      } else {
        res.send({'result': 'User created'});
      }
    });
  });

};
