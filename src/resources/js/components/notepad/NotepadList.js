import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setNotepadData } from '../../redux/actions/notepads';

import NotepadAdd from './NotepadAdd';

function mapStateToProps(state) {
    return { notepads: state.notepads };
}

class NotepadList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Load the notepads from the server
        // TODO Handle this better
        axios.get('/api/getNotepads')
            .then(response => this.props.setNotepadData(response.data))
            .then(error => console.error(error));
    }

    render() {
        const notepadList = this.props.notepads.allIds.map(notepadId => {
            const notepad = this.props.notepads.byId[notepadId];

            return (
                <li key={notepad.id}>
                    <Link to={'/notepad/' + notepad.id}>{notepad.title}</Link>
                </li>
            );
        });

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
    { setNotepadData }
)(NotepadList)
