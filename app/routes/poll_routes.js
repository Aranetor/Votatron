module.exports = function(app, db) {
  app.get('/polls', (req, res) => {
    //find all polls
    db.collection('polls').find().toArray((err, result) => {
      if (err) {
        res.send({'error': 'Cannot find polls'});
      } else {
        res.send(result);
      }
    });
    
    console.log(req.body);
    res.send('Hello')
  });
};
