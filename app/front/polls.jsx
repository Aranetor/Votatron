import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class PollList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hide:false,
      polls:[],
      pollToShow:""
    };
  }

  showPollDetail(id) {
    this.setState({hide:true, pollToShow:id});
  }

  showList() {
    this.setState({hide:false});
  }

  componentWillMount() {
    var _this=this;
    this.serverRequest = axios.get('/polls')
    .then(function (response) {
      _this.setState({
        polls: response.data
      });
    });
  }

  render () {
    if(this.state.hide){
      return <PollDetail callbackP={() => this.showList()} id={this.state.pollToShow}/>;
    }
    var renderPolls = [];
    for(var i=0; i<this.state.polls.length; i++) {
      renderPolls.push(<PollListItem callbackP={(id) => this.showPollDetail(id)} id={this.state.polls[i]._id} name={this.state.polls[i].name} key={i}/>);
    }
    return <div>{renderPolls}</div>;
  }
}


class PollListItem extends React.Component {
  clickPoll() {
    this.props.callbackP(this.props.id);
  }
  render() {
    return <div onClick={() => this.clickPoll()}>{this.props.name}</div>;
  }
}


class PollDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hide:false,
      name:"",
      poller:"",
      options:{},
      voters:[]
    };
  }

  goToList() {
    this.setState({hide:true});
    this.props.callbackP();
  }

  componentWillMount() {
      var _this=this;
      this.serverRequest = axios.get('/polls/'+this.props.id)
      .then(function (response) {
        var result = response.data[0];
        _this.setState({
          name:result.name,
          poller:result.poller,
          options:result.options,
          voters:result.voters
        });
      });
  }

  render () {
    if(this.state.hide){
      return null;
    }
    return <div><div onClick={() => this.goToList()}>Go back to List</div>
    <div>{this.state.name+" from "+this.state.poller+" whith "+this.state.options}</div></div>;
  }
}
