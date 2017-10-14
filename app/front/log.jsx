import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Log from './components/log.jsx';

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:"",
      password:""
    };
    this.sendLog = this.sendLog.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }

  updateInfo(event) {
    switch(event.target.name) {
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "pwd":
        this.setState({ password: event.target.value });
  }
}

  sendLog(event) {
    event.preventDefault();
    var _this=this;
    this.serverRequest = axios.post('/api/user/log', { email:this.state.email, password:this.state.password})
    .then(function (res) {
      if(res.data.error) {
        alert('Cannot log in :' + res.data.error);
      } else if(res.data.result) {
        alert(res.data.result);
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('user',res.data.user);
        window.location.href='/';
      }
    });
  }

  render () {
    return (
      <Log onSubmit={this.sendLog} onChange={this.updateInfo}/>
    )
  }
}
