import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="App">
        <h1>Beer Application</h1>
        { children }
      </div>
    );
  }
}

export default App;
