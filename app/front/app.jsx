import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';

import Page from './page.jsx';
import {PollList, PollResult} from './polls.jsx';
import SignUp from './sign.jsx';
import LogIn from './log.jsx';

/*class Page404 extends React.Component {
  render() {
    return (<div>Oh No, Invalid route !</div>);
  }
}*/

var isLogged = false;
const user = localStorage.getItem('user');
const token = localStorage.getItem('token');
if (token) {
    isLogged = true;
}

const HomePage = () => (
  <Page isLogged={isLogged} user={user} content={
    <div className="text-center">
      <h1>Vot-a-tron</h1>
      <p>Below are all polls. Click to see details of a poll, or log in to create a new poll.</p>
      <PollList/>
    </div>
  }/>
)

const LogPage = () => (
  <Page content={
      <LogIn/>
    }/>
)

const SignPage = () => (
  <Page content={
    <SignUp/>
  }/>
)

const PollPage = ({ match }) => (
  <Page content={
    <PollResult id={match.params.id}/>
  }/>
)

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={HomePage}/>
      <Route path="/poll/:id" component={PollPage}/>
      <Route path="/login" component={LogPage}/>
      <Route path="/signin" component={SignPage}/>
    </div>
  </BrowserRouter>,
  document.getElementById('app')
);
