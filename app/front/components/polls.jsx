import React from 'react';
import {Doughnut, defaults} from 'react-chartjs-2';

const PollListing = ({polls}) => {
  let content = polls.map((poll, i) =>
    <PollListItem id={poll._id} name={poll.name} key={i} />
  );

  return (
    <ul className="list-group">
      {content}
    </ul>
  );
};


const PollListItem = ({id, name}) => (
  <a className="list-group-item" href={"/poll/"+id}>{name}</a>
);


const Poll = ({id, name, options, poller, voters, onSubmit, onChange}) => {
  var optionsLabels = Object.keys(options);
  var optionsVotes = [];

  for (var i in options) {
    optionsVotes.push(options[i]);
  }

  const chartData = {
    labels: optionsLabels,
    datasets: [{
      data: optionsVotes,
      backgroundColor: [
        'blue',
        'red',
        'yellow',
        'green',
        'orange',
        'purple'
      ],
    }]
  };

  return (
    <div>
      <div className="col-sm-4">
        <p>{name+", submitted by "+poller}</p>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <div className="row">
              <div className="col-xs-12">
                <div className="form-group">
                  <label>I'd like to vote for :</label>
                  <select className="form-control" onChange={onChange}>
                    {optionsLabels.map((option, i) =>
                      <option value={option} key={i}>{option}</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="col-xs-12">
                <input className="btn btn-primary btn-block" type="submit" />
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="col-sm-8">
        <div className="chart-container">
          <Doughnut data={chartData} />
        </div>
      </div>
    </div>
  );
};

export {PollListing, Poll};
