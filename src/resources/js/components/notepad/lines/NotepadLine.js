import React, { Component } from 'react';
import { connect } from 'react-redux';

import { removeLineFromPage } from '../../../redux/actions/pages';
import { removeLine } from '../../../redux/actions/lines';

import Blocks from '../blocks/index';

function mapStateToProps(state, ownProps) {
    const selectedPage = state.pages.selectedId;

    const line = state.lines.byId[ownProps.lineId];
    const blocks = line.blocks.map(blockId => state.blocks.byId[blockId]);

    return {
        selectedPage,
        blocks
    }
}

class NotepadLine extends Component {
    componentDidUpdate() {
        // Remove the line if it has no blocks
        if (this.props.blocks.length < 1) {
            this.props.removeLineFromPage(this.props.selectedPage, this.props.lineId);
            this.props.removeLine(this.props.lineId);
        }
    }

    render() {
        const blocks = this.props.blocks.map(block => {
            const Block = Blocks[block.type];
            return (
                <div className="col" key={block.id}>
                    <Block lineId={this.props.lineId} blockId={block.id} content={block.content} />
                </div>
            )
        });

        return (
            <div className="line row">
                {blocks}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    { removeLine, removeLineFromPage }
)(NotepadLine)
