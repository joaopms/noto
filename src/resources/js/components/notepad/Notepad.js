import React, { Component } from 'react';

import NotepadList from './NotepadList';
import NotepadPageList from './pages/NotepadPageList';
import NotepadPage from './pages/NotepadPage';

export default class Notepad extends Component {
    constructor(props) {
        super(props);
    }

    // TODO Select the notepad and page from the URL

    render() {
        console.log("[Notepad] Rendering");
        return (
            <div>
                <NotepadList />
                <NotepadPageList />
                <NotepadPage />
            </div>
        )
    }
}
