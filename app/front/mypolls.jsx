import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import {PollListing} from './components/polls.jsx'

export default class MyPolls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polls:[],
      pollToShow:""
    };
  }

  getIniti

  componentDidMount() {
    var _this=this;
    this.serverRequest = axios.get('/api/mypolls', {headers: {'x-access-token': localStorage.getItem('token')}})
    .then(function (res) {
      if(res.data.error) {
        alert('Cannot find polls :' + res.data.error);
        window.location.href='/login';
      } else {
        _this.setState({
          polls: res.data
        });
      }
    });
  }

  render () {
    return (
      <PollListing polls={this.state.polls} />
    )
  }
}
