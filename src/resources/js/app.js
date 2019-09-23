require('./bootstrap');

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from './redux/store';

import Header from './components/Header';
import Notepad from './components/notepad/Notepad';
import NotepadList from './components/NotepadList';
import NotepadPageList from './components/NotepadPageList';

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
                    {/* <Notepad data={notepadTestData} /> */}

                    <Route exact path="/" component={NotepadList} />
                    <Route path="/notepad/:notepadId" component={NotepadPageList} />
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(< App />, document.getElementById('app'));
