import React, { Component } from 'react';
import MainContent from './containers/main_content';
// PROVISIONAL DEFINITION OF ADMIN FOR RENDER PURPOSES
import Admin from './containers/admin/admin';
import Signin from './containers/auth/signin';
import Signup from './containers/auth/signup';
import Signout from './containers/auth/signout';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { RutaPrivada } from './containers/auth/require_auth';

class App extends Component {
  render() {
    return (
      <div className="">
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path='/' component={MainContent} />  
              <Route path='/signin' component={Signin} />
              <Route path='/signup' component={Signup} />
              <Route path='/signout' component={Signout} />    
              <RutaPrivada path='/admin' component={Admin} />          
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
