import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setPageData, setLoadingStatus, setLoadedStatus, clearPageData, selectPage } from '../../../redux/actions/pages';
import { STATUS } from '../../../redux/constants';

import NotepadPageAdd from './NotepadPageAdd';

function mapStateToProps(state, ownProps) {
    const status = state.pages.status;
    const notepadStatus = state.notepads.status;
    const selectedNotepad = state.notepads.selectedId;
    const selectedPage = state.pages.selectedId;

    const isReady = status === STATUS.LOADED;
    const pages = isReady ? state.notepads.byId[selectedNotepad].pages.map(pageId => state.pages.byId[pageId]) : [];

    return {
        status,
        notepadStatus,
        selectedNotepad,
        selectedPage,
        pages
    }
}

class NotepadPageList extends Component {
    constructor(props) {
        super(props);
    }

    async fetchPages() {
        // Load the pages from the server
        // TODO Handle this better
        try {
            this.props.setLoadingStatus();
            const response = await axios.post('/api/getPages', { notepad_id: this.props.selectedNotepad });
            this.props.setPageData(response.data);
            this.props.setLoadedStatus();
        } catch (error) {
            console.error(error)
        }
    }

    componentDidUpdate() {
        const isNotepadSelected = !!this.props.selectedNotepad;
        const isNotepadLoaded = this.props.notepadStatus === STATUS.LOADED;
        const isPagesEmpty = this.props.status === STATUS.INIT;
        if (isNotepadSelected && isNotepadLoaded && isPagesEmpty) {
            this.fetchPages();
        }
    }

    selectPage(id) {
        console.log("[NotepadPageList] Selecting page " + id);
        if (id === this.props.selectedPage) {
            console.log("[NotepadPageList] Page already selected, ignoring");
            return;
        }
        this.props.selectPage(id);
    }

    render() {
        console.log("[NotepadPageList] Rendering");

        if (this.props.status === STATUS.INIT) {
            return "Select a notepad";
        }

        if (this.props.status === STATUS.LOADING) {
            return "Loading...";
        }

        const pageList = this.props.pages.map(page =>
            <li key={page.id} onClick={this.selectPage.bind(this, page.id)}>
                {/* <Link to={'/notepad/' + this.props.selectedNotepad + '/page/' + page.id}>{page.title}</Link> */}
                {page.title}
            </li>
        );

        return (
            <div>
                <NotepadPageAdd />
                <ul>
                    {pageList}
                </ul>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    { setPageData, setLoadingStatus, setLoadedStatus, clearPageData, selectPage }
)(NotepadPageList)
