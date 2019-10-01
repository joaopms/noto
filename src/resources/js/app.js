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

// TODO SAMPLE DATA ---------------------------------------------------------------------
// add a notepad
const notepadAction = require('./redux/actions/notepads').addNotepad('test notepad');
const notepadId = notepadAction.id;
store.dispatch(notepadAction);

// add a page to the notepad
const pageAction = require('./redux/actions/pages').addPage('test page');
const pageId = pageAction.id;
store.dispatch(pageAction);
store.dispatch(require('./redux/actions/notepads').addPageToNotepad(notepadId, pageId));
// TODO SAMPLE DATA ---------------------------------------------------------------------

ReactDOM.render(< App />, document.getElementById('app'));
