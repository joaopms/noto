import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addBlock } from '../../../redux/actions/blocks';
import { addBlockToPage } from '../../../redux/actions/pages';

class NotepadBlockAdd extends Component {
    constructor(props) {
        super(props);

        this.handleAddBlock = this.handleAddBlock.bind(this);
    }

    handleAddBlock() {
        const blockId = this.props.addBlock().id;
        this.props.addBlockToPage(this.props.pageId, blockId);
    }

    render() {
        return (
            <button type="button" className="btn btn-success" onClick={this.handleAddBlock}>Add block</button>
        );
    }
}

export default connect(
    null,
    { addBlock, addBlockToPage }
)(NotepadBlockAdd)
