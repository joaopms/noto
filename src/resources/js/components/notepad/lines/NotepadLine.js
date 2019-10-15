import React, { Component } from 'react';
import { connect } from 'react-redux';

import { removeLineFromPage } from '../../../redux/actions/pages';
import { removeLine } from '../../../redux/actions/lines';

import Blocks from '../blocks/index';

function mapStateToProps(state, ownProps) {
    const pageId = ownProps.pageId;
    const page = state.pages.byId[pageId];
    const lineId = ownProps.lineId;
    const line = state.lines.byId[lineId];
    const blocks = line.blocks.map(blockId => state.blocks.byId[blockId]).filter(block => block);

    return {
        page,
        line,
        blocks
    }
}

class NotepadLine extends Component {
    componentDidUpdate() {
        // Remove the line if it has no blocks
        if (this.props.blocks.length < 1) {
            console.log(this.props);

            this.props.removeLineFromPage(this.props.page.id, this.props.line.id);
            this.props.removeLine(this.props.line.id);
        }
    }

    render() {
        const blocks = this.props.blocks.map(block => {
            const Block = Blocks[block.type];
            return (
                <div className="col" key={block.id}>
                    <Block lineId={this.props.line.id} blockId={block.id} content={block.content} />
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
