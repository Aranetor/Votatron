var {ObjectId} = require('mongodb');

module.exports = function(app, db) {
  app.get('/api/polls', (req, res) => {
    //find all polls
    db.collection('polls').find().sort({_id:-1}).toArray((err, result) => {
      if (err) {
        res.send({'error': 'Cannot find polls'});
      } else {
        res.send(result);
      }
    });
  });

  app.get('/api/polls/:id', (req, res) => {
    const idPoll = ObjectId(req.params.id);
    db.collection('polls').find({_id:ObjectId(req.params.id)}).toArray((err, result) => {
      if (err) {
        res.send({'error': 'Cannot find polls'});
      } else {
        res.send(result);
      }
    });
  });

  app.post('/api/polls', (req, res) => {
    const poll = {name:req.body.name,poller:req.body.poller,options:req.body.options,voters:[]};
    /*db.collection('polls').insert(poll, (err, result) => {
      if(err) {
        res.send({'error': 'Error in creating a new Poll'});
      } else {
        res.send(result.ops[0]);
      }
    });*/
    res.send(poll);
  });

  app.put('/api/polls/:id/vote', (req, res) => {
    var key="options."+req.body.vote;
    var query={};
    query[key] = 1;

    var voteError={'error':'Error in voting'};
    var voterError={'error':'You already voted for this poll '};

    var ip=req.ip.split(":")[3];

    db.collection('polls').findOneAndUpdate({_id:ObjectId(req.params.id)}, {$inc: query}, {returnOriginal:false}, (err, doc) => {
      if(err) {
        res.send({'error': 'Error in voting'});
      } else {
        res.send(doc);
      }
    });
  });
};
