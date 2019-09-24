import React, { Component } from 'react';
import { connect } from 'react-redux';

import NotepadLineAdd from '../lines/NotepadLineAdd';

import NotepadLine from '../lines/NotepadLine';
import Extensions from '../extensions';

function mapStateToProps(state, ownProps) {
    const notepadId = ownProps.match.params.notepadId;
    const notepad = state.notepads.byId[notepadId];
    const pageId = ownProps.match.params.pageId;
    const page = state.pages.byId[pageId];
    const lines = page.lines.map(lineId => state.lines.byId[lineId]);
    const extensions = state.extensions;

    return {
        notepad,
        page,
        lines,
        extensions
    }
}

class NotepadPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const lines = this.props.lines.map(line => {
            const extensions = line.extensions.map(extensionId => {
                const extension = this.props.extensions.byId[extensionId];
                const Extension = Extensions[extension.type];
                return (
                    <Extension key={extension.id} content={extension.content} />
                )
            });

            return (
                <NotepadLine key={line.id}>
                    {extensions}
                </NotepadLine>
            );
        });

        return (
            <div className="notepad">
                <NotepadLineAdd pageId={this.props.page.id} />
                {lines}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    null
)(NotepadPage)
