import React from 'react';
import ReactDOM from 'react-dom';
import PollList from './polls.jsx';

class App extends React.Component {
  render() {
    return <PollList/>;
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
