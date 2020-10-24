import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import login from './container/login';
import signup from './container/signup';
import home from './container/home';

function App() {


  return (
    <div className="main">
      <Router>
        <div>
          <Switch>
              <Route exact path="/login" component={login}/>
              <Route exact path="/signup" component={signup}/>
              <Route exact path="/" component={home}/>
          </Switch>
        </div>
      </Router>
    
    </div>
  );
}

export default App;

    