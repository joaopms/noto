require('./bootstrap');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import NotoRouter from './components/NotoRouter';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <NotoRouter />
            </Provider>
        );
    }
}

// Load the user from localStorage
const userData = localStorage.getItem('user');
if (userData) {
    const userDataAction = require('./redux/actions/noto').setUserData(JSON.parse(userData));
    store.dispatch(userDataAction);
    console.log('Loaded user data from local storage');
}

ReactDOM.render(< App />, document.getElementById('app'));
