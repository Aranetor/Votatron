import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import {Doughnut, defaults} from 'react-chartjs-2';

export class PollList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polls:[],
      pollToShow:""
    };
  }

  componentWillMount() {
    var _this=this;
    this.serverRequest = axios.get('/api/polls')
    .then(function (response) {
      _this.setState({
        polls: response.data
      });
    });
  }

  render () {
    return (
      <ul className="list-group">
        {[...Array(this.state.polls.length)].map((x, i) =>
          <PollListItem id={this.state.polls[i]._id} name={this.state.polls[i].name} key={i} />
        )}
      </ul>
    )
  }
}


class PollListItem extends React.Component {
  render() {
    return <a className="list-group-item" href={"/poll/"+this.props.id}>{this.props.name}</a>;
  }
}


export class PollResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      poller:"",
      options:[],
      votes:[],
      voters:[]
    };
  }

  componentWillMount() {
      var _this=this;
      this.serverRequest = axios.get('/api/polls/'+this.props.id)
      .then(function (response) {
        var result = response.data[0];
        _this.setState({
          name:result.name,
          poller:result.poller,
          options:result.options,
          votes:result.votes,
          voters:result.voters
        });
      });
  }

  render () {
    const chartData = {
      labels: this.state.options,
      datasets: [{
        data: this.state.votes,
        backgroundColor: [
          'blue',
          'red',
          'yellow',
          'green',
          'orange',
          'purple'
        ],
      }]
    }

    return (
      <div>
        <div className="col-sm-4">
          <p>{this.state.name+", submitted by "+this.state.poller}</p>
          <form action={"/api/polls/"+this.props.id+"/vote"} method="put">
            <div className="form-group">
              <div className="row">
                <div className="col-xs-12">
                  <div className="form-group">
                    <label>I'd like to vote for :</label>
                    <select className="form-control">
                      {[...Array(this.state.options.length)].map((x, i) =>
                        <option value={this.state.options[i]} key={i}>{this.state.options[i]}</option>
                      )}
                    </select>
                  </div>
                </div>
                <div className="col-xs-12">
                  <input className="btn btn-primary btn-block" value="Submit" type="submit" />
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
    )
  }
}
