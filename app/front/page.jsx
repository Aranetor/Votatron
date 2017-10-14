import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import PageComp from './components/page.jsx';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }

  logOut(event) {
    event.preventDefault();
    var _this=this;
    alert("Log out succesfull !");
    localStorage.clear();
    window.location.href='/';
  }

  render () {
    return (
      <PageComp onClick={this.logOut} isLogged={this.props.isLogged} user={this.props.user} content={this.props.content}/>
    )
  }
}
