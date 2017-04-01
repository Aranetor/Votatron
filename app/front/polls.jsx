import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import {PollListing, Poll} from './components/polls.jsx'

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
      <PollListing polls={this.state.polls} />
    )
  }
}


export class PollResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:this.props.id,
      name:"",
      poller:"",
      options:[],
      votes:[],
      voters:[],
      selectedVote:0
    };
    this.sendVote = this.sendVote.bind(this);
    this.selectVote = this.selectVote.bind(this);
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

  selectVote(event) {
    this.setState({ selectedVote: event.target.value });
  }

  sendVote(event) {
    event.preventDefault();
    this.serverRequest = axios.put('/api/polls/'+this.props.id+'/vote', { vote:this.state.selectedVote })
    .then(function (response) {

    });
  }

  render () {
    return (
      <Poll id={this.state.id} name={this.state.name} poller={this.state.poller}
         options={this.state.options} votes={this.state.votes} voters={this.state.voters} onSubmit={this.sendVote} onChange={this.selectVote}/>
    )
  }
}
