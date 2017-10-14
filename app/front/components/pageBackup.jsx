import React from 'react';

const Page = ({content}) => (
  <div>
    <Header/>
    <Content content={content}/>
  </div>
);

const Header = () => (
  <nav className="navbar navbar-default navbar-fixed-top">
    <div className="container">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href="/">Vot-a-tron</a>
      </div>
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">
          <li className="active"><a href="/">Home <span className="sr-only">(current)</span></a></li>
          <li><a href="/login">Log in</a></li>
          <li><a href="/signin">Sign in</a></li>
        </ul>
      </div>
    </div>
  </nav>
);

const Content = ({content}) => (
  <div className="jumbotron container">
    {content}
  </div>
);

export default Page;
