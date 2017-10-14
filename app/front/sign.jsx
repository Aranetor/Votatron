import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Sign from './components/sign.jsx';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:"",
      password:"",
      pwdcheck:""
    };
    this.sendSign = this.sendSign.bind(this);
    this.updateInfo = this.updateInfo.bind(this);
  }

  updateInfo(event) {
    switch(event.target.name) {
      case "email":
        this.setState({ email: event.target.value });
        break;
      case "pwd":
        this.setState({ password: event.target.value });
        break;
      case "confpwd":
        this.setState({ pwdcheck: event.target.value });
    }
  }

  sendSign(event) {
    event.preventDefault();
    var _this=this;
    this.serverRequest = axios.post('/api/user/sign', { email:this.state.email, password:this.state.password, pwdcheck:this.state.pwdcheck })
    .then(function (res) {
      if(res.data.error) {
        alert('Cannot sign in :' + res.data.error);
      } else if(res.data.result) {
        alert(res.data.result);
        window.location.href='/';
      }
    });
  }

  render () {
    return (
      <Sign onSubmit={this.sendSign} onChange={this.updateInfo}/>
    )
  }
}
