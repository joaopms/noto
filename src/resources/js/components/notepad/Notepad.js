import React, { Component } from 'react';
import { connect } from 'react-redux';

import { selectNotepad } from '../../redux/actions/notepads';
import { selectPage, clearPageData } from '../../redux/actions/pages';

import NotepadList from './NotepadList';
import NotepadPageList from './pages/NotepadPageList';
import NotepadPage from './pages/NotepadPage';

function mapStateToProps(state) {
    const selectedNotepad = state.notepads.selectedId;
    const selectedPage = state.pages.selectedId;

    return {
        selectedNotepad,
        selectedPage
    }
}

class Notepad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstLoad: true
        }
    }

    componentDidMount() {
        // Select the notepad and page from the URL
        const { notepadId, pageId } = this.props.match.params;
        console.log("[Notepad] Trying to select the notepad and page from the URL");
        if (notepadId) {
            console.log("[Notepad] Selected notepad: " + notepadId);
            this.props.selectNotepad(notepadId);
        }

        if (pageId) {
            console.log("[Notepad] Selected page: " + pageId);
            this.props.selectPage(pageId);
        }

        this.setState({ firstLoad: false });
    }

    componentDidUpdate(prevProps, prevState) {
        // Update the URL on notepad or page change
        const notFirstLoad = !prevState.firstLoad;
        const notepadChanged = this.props.selectedNotepad !== prevProps.selectedNotepad;
        const pageChanged = this.props.selectedPage !== prevProps.selectedPage;
        if (notFirstLoad && (notepadChanged || pageChanged)) {
            console.log("[Notepad] Notepad or page changed, updating the URL");

            var url = "";
            if (this.props.selectedNotepad) {
                url += `/notepad/${this.props.selectedNotepad}`;
            }

            if (this.props.selectedPage) {
                url += `/page/${this.props.selectedPage}`;
            }

            this.props.history.push(url);
        }
    }

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

export default connect(
    mapStateToProps,
    { selectNotepad, selectPage, clearPageData }
)(Notepad)
