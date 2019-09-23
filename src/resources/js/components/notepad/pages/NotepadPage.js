import React, { Component } from 'react';
import { connect } from 'react-redux';

import NotepadBlockAdd from '../blocks/NotepadBlockAdd';

import NotepadBlock from '../blocks/NotepadBlock';
import Extensions from '../extensions';

function mapStateToProps(state, ownProps) {
    const notepadId = ownProps.match.params.notepadId;
    const notepad = state.notepads.byId[notepadId];
    const pageId = ownProps.match.params.pageId;
    const page = state.pages.byId[pageId];
    const blocks = page.blocks.map(blockId => state.blocks.byId[blockId]);
    const extensions = state.extensions;

    return {
        notepad,
        page,
        blocks,
        extensions
    }
}

class NotepadPage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const blocks = this.props.blocks.map(block => {
            const extensions = block.extensions.map(extensionId => {
                const extension = this.props.extensions.byId[extensionId];
                const Extension = Extensions[extension.type];
                return (
                    <Extension key={extension.id} content={extension.content} />
                )
            });

            return (
                <NotepadBlock key={block.id}>
                    {extensions}
                </NotepadBlock>
            );
        });

        return (
            <div className="notepad">
                <NotepadBlockAdd pageId={this.props.page.id} />
                {blocks}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    null
)(NotepadPage)
