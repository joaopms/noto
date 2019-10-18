import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setNotepadData, setLoadingStatus, setLoadedStatus, selectNotepad } from '../../redux/actions/notepads';
import { clearPageData } from '../../redux/actions/pages';
import { STATUS } from '../../redux/constants';

import NotepadAdd from './NotepadAdd';

function mapStateToProps(state) {
    const status = state.notepads.status;
    const selectedNotepad = state.notepads.selectedId;

    const isReady = status === STATUS.LOADED;
    const notepads = isReady ? state.notepads : [];

    return {
        status,
        selectedNotepad,
        notepads
    };
}

class NotepadList extends Component {
    constructor(props) {
        super(props);
    }

    async fetchNotepads() {
        // Load the notepads from the server
        // TODO Handle this better
        try {
            this.props.setLoadingStatus();
            const response = await axios.get('/api/getNotepads');
            this.props.setNotepadData(response.data);
            this.props.setLoadedStatus();
        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        this.fetchNotepads();
    }

    selectNotepad(id) {
        console.log("[NotepadList] Selecting notepad " + id);
        if (id === this.props.selectedNotepad) {
            console.log("[NotepadList] Notepad already selected, ignoring");
            return;
        }

        this.props.clearPageData();
        this.props.selectNotepad(id);
    }

    render() {
        console.log("[NotepadList] Rendering");

        if (this.props.status !== STATUS.LOADED) {
            return "Loading..."
        }

        const notepadList = this.props.notepads.allIds.map(notepadId => {
            const notepad = this.props.notepads.byId[notepadId];

            return (
                <li key={notepad.id} onClick={this.selectNotepad.bind(this, notepad.id)}>
                    {/* <Link to={'/notepad/' + notepad.id}>{notepad.title}</Link> */}
                    {notepad.title}
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
    { setNotepadData, setLoadingStatus, setLoadedStatus, selectNotepad, clearPageData }
)(NotepadList)
