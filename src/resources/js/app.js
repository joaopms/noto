require('./bootstrap');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Notepad from './components/notepad/Notepad';

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
            <div>
                <Header />
                <Notepad data={notepadTestData} />
            </div>
        );
    }
}

ReactDOM.render(< App />, document.getElementById('app'));
