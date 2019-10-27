import React, { Component } from 'react';
import { connect } from 'react-redux';

import { STATUS } from '../../../redux/constants';

import { setLoadingContentStatus, setLoadedContentStatus } from '../../../redux/actions/pages';
import { setLineData } from '../../../redux/actions/lines';
import { setBlockData } from '../../../redux/actions/blocks';

import NotepadLineAdd from '../lines/NotepadLineAdd';
import NotepadLine from '../lines/NotepadLine';
import NotepadFileModal from '../modals/files/NotepadFileModal';

function mapStateToProps(state, ownProps) {
    const status = state.pages.contentStatus;
    const pageStatus = state.pages.status;
    const selectedPage = state.pages.selectedId;

    const isReady = status === STATUS.LOADED;
    const lines = isReady ? state.pages.byId[selectedPage].lines.map(lineId => state.lines.byId[lineId]) : [];

    return {
        status,
        pageStatus,
        selectedPage,
        lines
    }
}

class NotepadPage extends Component {
    constructor(props) {
        super(props);
    }

    async fetchPages() {
        // Load the content from the server
        // TODO Handle this better
        try {
            this.props.setLoadingContentStatus();
            const response = await axios.post('/api/getPageContent', { page_id: this.props.selectedPage });
            this.props.setLineData(response.data.lines);
            this.props.setBlockData(response.data.blocks);
            this.props.setLoadedContentStatus();
        } catch (error) {
            console.error(error)
        }
    }

    componentDidUpdate() {
        const isPageSelected = !!this.props.selectedPage;
        const isPageLoaded = this.props.pageStatus === STATUS.LOADED;
        const isContentEmpty = this.props.status === STATUS.INIT;
        if (isPageSelected && isPageLoaded && isContentEmpty) {
            this.fetchPages();
        }
    }

    render() {
        console.log("[NotepadPage] Rendering");

        if (this.props.status === STATUS.INIT) {
            return "Select a page";
        }

        if (this.props.status === STATUS.LOADING) {
            return "Loading...";
        }

        const lines = this.props.lines.map(line => (
            <NotepadLine key={line.id} lineId={line.id} />
        ));

        return (
            <div className="notepad">
                <NotepadLineAdd />
                <NotepadFileModal />
                {lines}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    { setLoadingContentStatus, setLoadedContentStatus, setLineData, setBlockData }
)(NotepadPage)
