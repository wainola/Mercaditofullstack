import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Products from './components/products';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Testing React Deployment</h1>
        </header>
        <Products />
      </div>
    );
  }
}

export default App;
