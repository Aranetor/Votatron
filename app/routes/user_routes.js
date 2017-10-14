const bcrypt        = require("bcrypt");
const jwt           = require("jsonwebtoken");
const jwtSecret      = process.env.SECRET;

module.exports = function(app, db) {
  app.post('/api/user/log', (req, res) => {

    db.collection('users').find({username:req.body.email}).toArray((err, result) => {
      console.log(result.length);
      if (err) {
        res.send({'error': 'Error in logging in'});
      } else if (result.length==0) {
        res.send({'error': 'User does not exist'});
      } else {
        if(!bcrypt.compareSync(req.body.password, result[0].hash)) {
          res.send({'error': 'Wrong password'});
        } else {

          var token = jwt.sign(result[0], jwtSecret, {
            expiresIn: '24h'
          });

          var user = result[0].username;

          res.send({'result': 'Successfully logged in !','token':token,'user':user});

        }
      }
    });
  });

  app.post('/api/user/sign', (req, res) => {
    if(req.body.password!=req.body.pwdcheck)
    {
      res.send({'error': 'Passwords are not the same'});
    } else {

      const hashPwd = bcrypt.hashSync(req.body.password, 10);
      const user = {username:req.body.email,hash:hashPwd};

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
    }
  });

};
