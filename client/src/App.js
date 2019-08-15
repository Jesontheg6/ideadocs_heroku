import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './App.css'

import BoardTitle from './components/boards';
import Board from './components/boards/board';
import NavBar from './components/base/navbar';
import Login from './components/user/login';
import SignUp from './components/user/signup';
import { withAuthentication } from './utils/session';

const App = (props) => {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <hr />
        <Container>
          <Switch>
            <Route exact path="/" render={() => <div>Add home page!</div>} />
            <Route exact path="/signup" render={() => <SignUp {...props} />}/>
            <Route exact path="/signin" component={Login} />
            <Route exact strict path="/boards" component={BoardTitle} />
            <Route exact path="/boards/:slug" component={Board} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default withAuthentication(App);
