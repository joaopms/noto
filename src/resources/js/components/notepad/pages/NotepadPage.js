import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setLineData } from '../../../redux/actions/lines';
import { setBlockData } from '../../../redux/actions/blocks';

import NotepadLineAdd from '../lines/NotepadLineAdd';

import NotepadLine from '../lines/NotepadLine';
import Blocks from '../blocks';

function mapStateToProps(state, ownProps) {
    const notepadId = ownProps.match.params.notepadId;
    const notepad = state.notepads.byId[notepadId];
    const pageId = ownProps.match.params.pageId;
    const page = state.pages.byId[pageId];
    const lines = page.lines.map(lineId => state.lines.byId[lineId]);
    const blocks = state.blocks;

    return {
        notepad,
        page,
        lines,
        blocks
    }
}

class NotepadPage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Load the content from the server
        // TODO Handle this better
        axios.post('/api/getPageContent', { page_id: this.props.page.id })
            .then(response => {
                this.props.setLineData(response.data.lines);
                this.props.setBlockData(response.data.blocks);
            })
            .then(error => console.error(error));
    }

    render() {
        const lines = this.props.lines.filter(line => line).map(line => {
            const blocks = line.blocks.filter(blockId => this.props.blocks.byId[blockId]).map(blockId => {
                const block = this.props.blocks.byId[blockId];
                const Block = Blocks[block.type];
                return (
                    <Block key={block.id} lineId={line.id} blockId={block.id} content={block.content} />
                )
            });

            return (
                <NotepadLine key={line.id} lineId={line.id}>
                    {blocks}
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
    { setLineData, setBlockData }
)(NotepadPage)
