import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SYNC_STATUS } from '../../redux/constants';

import { prepareSyncing, startSyncing, setSuccessfullSync, setFailedSync } from '../../redux/actions/noto';
import { selectNotepad } from '../../redux/actions/notepads';
import { selectPage, clearPageData } from '../../redux/actions/pages';

import NotepadList from './NotepadList';
import NotepadPageList from './pages/NotepadPageList';
import NotepadPage from './pages/NotepadPage';

function mapStateToProps(state) {
    const selectedNotepad = state.notepads.selectedId;
    const selectedPage = state.pages.selectedId;
    const syncStatus = state.noto.sync.status;
    const syncingActions = state.noto.sync.syncingActions;

    return {
        selectedNotepad,
        selectedPage,
        syncStatus,
        syncingActions
    }
}

class Notepad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstLoad: true,
            syncTimer: null
        }

        this.sync = this.sync.bind(this);
    }

    async sync() {
        console.log("[Notepad] Trying to sync...");

        // Copy the transactions from pending to syncing
        if (this.props.syncStatus === SYNC_STATUS.INIT || this.props.syncStatus == SYNC_STATUS.SYNCED) {
            this.props.prepareSyncing();
        }

        // Try to sync
        if (this.props.syncingActions.length < 1 || this.props.syncStatus === SYNC_STATUS.SYNCING) {
            console.log("[Notepad] Nothing to sync or already syncing");
            return;
        }

        console.log("[Notepad] Syncing...");
        this.props.startSyncing();
        try {
            const response = await axios.post('/api/sync', this.props.syncingActions);
            this.props.setSuccessfullSync();
            console.log("[Notepad] Successfully synced");
        } catch (error) {
            this.props.setFailedSync();
            console.log("[Notepad] Something went wrong while syncing");
            console.error(error);
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

        // Start the syncing timer (5 seconds)
        console.log("[Notepad] Starting the sync timer");
        const syncTimer = setInterval(this.sync, 5 * 1000);

        this.setState({
            firstLoad: false,
            syncTimer: syncTimer
        });
    }

    componentWillUnmount() {
        console.log("[Notepad] Stopping the sync timer");
        clearInterval(this.state.syncTimer);
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
    { prepareSyncing, startSyncing, setSuccessfullSync, setFailedSync, selectNotepad, selectPage, clearPageData }
)(Notepad)
