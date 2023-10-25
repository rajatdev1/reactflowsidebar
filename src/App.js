import React, { Component } from 'react';
import CustomDiagram from './CustomDiagram';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Hive-Connect workflow</h1>
        </header>
       
        <main className="main">
          <CustomDiagram />
        </main>
      </div>
    );
  }
}

export default App;
