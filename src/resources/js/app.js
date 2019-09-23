require('./bootstrap');

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import Header from './components/Header';
import NotepadList from './components/notepad/NotepadList';
import NotepadPageList from './components/notepad/pages/NotepadPageList';
import NotepadPage from './components/notepad/pages/NotepadPage';

const notepadTestData = [
    {
        id: 1,
        extensions: [
            {
                id: 1,
                type: 'ImageBlockExtension',
                image: 'https://place-hold.it/2000x100'
            }
        ]
    },
    {
        id: 2,
        extensions: [
            {
                id: 1,
                type: 'TextBlockExtension',
                text: '123'
            }
        ]
    },
    {
        id: 3,
        extensions: [
            {
                id: 1,
                type: 'TextBlockExtension',
                text: '123'
            }
        ]
    },
    {
        id: 4,
        extensions: [
            {
                id: 1,
                type: 'ImageBlockExtension',
                image: 'https://place-hold.it/500x100'
            },
            {
                id: 2,
                type: 'TextBlockExtension',
                text: '123'
            },
            {
                id: 3,
                type: 'ImageBlockExtension',
                image: 'https://place-hold.it/500x100'
            }
        ]
    },
    {
        id: 5,
        extensions: [
            {
                id: 1,
                type: 'ImageBlockExtension',
                image: 'https://place-hold.it/500x100'
            },
            {
                id: 2,
                type: 'ImageBlockExtension',
                image: 'https://place-hold.it/500x100'
            },
        ]
    },
    {
        id: 6,
        extensions: [
            {
                id: 1,
                type: 'ImageBlockExtension',
                image: 'https://place-hold.it/500x100'
            },
            {
                id: 2,
                type: 'TextBlockExtension',
                text: '123'
            }
        ]
    },
    {
        id: 7,
        extensions: [
            {
                id: 1,
                type: 'ImageBlockExtension',
                image: 'https://place-hold.it/500x100'
            },
            {
                id: 2,
                type: 'TextBlockExtension',
                text: '123'
            }
        ]
    }
];

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Header />

                    <Route exact path="/" component={NotepadList} />
                    <Route exact path="/notepad/:notepadId" component={NotepadPageList} />
                    <Route exact path="/notepad/:notepadId/page/:pageId" component={NotepadPage} />
                </Router>
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
