import React from 'react';

const PageComp = ({isLogged, user, onClick, content}) => {
  return(
  <div>
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
        <Navbar isLogged={isLogged} user={user} onClick={onClick}/>
      </div>
    </nav>
    <Content content={content}/>
  </div>
  );
};

const Navbar = ({isLogged, user, onClick}) => {
  if(isLogged) {
    return(
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">
          <li className="active"><a href="/">Home <span className="sr-only">(current)</span></a></li>
          <li><a href="#">Hello {user}</a></li>
          <li><a href="/mypolls">My Polls</a></li>
          <li><a href="#" onClick={onClick}>Log out</a></li>
        </ul>
      </div>
    );
  } else {
    return (
      <div id="navbar" className="navbar-collapse collapse">
        <ul className="nav navbar-nav navbar-right">
          <li className="active"><a href="/">Home <span className="sr-only">(current)</span></a></li>
          <li><a href="/login">Log in</a></li>
          <li><a href="/signin">Sign in</a></li>
        </ul>
      </div>
    );
  }
};

const Content = ({content}) => (
  <div className="jumbotron container">
    {content}
  </div>
);

export default PageComp;
