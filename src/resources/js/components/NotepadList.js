import React, { Component } from 'react';
import { connect } from 'react-redux';

import NotepadAdd from './NotepadAdd';

function mapStateToProps(state) {
    return { notepads: state.notepads };
}

class NotepadList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const notepadList = this.props.notepads.map(notepad =>
            <li key={notepad.id}>
                <a href="#">{notepad.title}</a>
            </li>
        );

        return (
            <div>
                <NotepadAdd />
                <ul>
                    {notepadList}
                </ul>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    null
)(NotepadList)
