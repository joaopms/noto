require('./bootstrap');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Example from './components/Example';

class App extends Component {
  render() {
    return (
        <Example />
    )
  }
}

ReactDOM.render(<App /> , document.getElementById('app'));
