import React, { Component } from 'react';
import MainContent from './containers/main_content';
import Login from './containers/login/login';
// PROVISIONAL DEFINITION OF ADMIN FOR RENDER PURPOSES
import Admin from './containers/admin/admin';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="">
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={MainContent} />
              <Route path="/login" component={Login} />
              <Route path="/admin" component={Admin} />              
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
