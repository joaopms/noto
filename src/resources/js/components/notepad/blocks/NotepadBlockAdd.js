import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addBlock, addExtensionToBlock } from '../../../redux/actions/blocks';
import { addBlockToPage } from '../../../redux/actions/pages';
import { addTextExtension, addImageExtension } from '../../../redux/actions/extensions';

class NotepadBlockAdd extends Component {
    constructor(props) {
        super(props);

        this.addBlock = this.addBlock.bind(this);
        this.handleAddBlockOfText = this.handleAddBlockOfText.bind(this);
        this.handleAddBlockOfImage = this.handleAddBlockOfImage.bind(this);
    }

    addBlock() {
        const blockId = this.props.addBlock().id;
        this.props.addBlockToPage(this.props.pageId, blockId);
        return blockId;
    }

    handleAddBlockOfText() {
        const blockId = this.addBlock();
        const extensionId = this.props.addTextExtension().id;
        this.props.addExtensionToBlock(blockId, extensionId);
    }

    handleAddBlockOfImage() {
        const blockId = this.addBlock();
        const extensionId = this.props.addImageExtension().id;
        this.props.addExtensionToBlock(blockId, extensionId);
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-success" onClick={this.handleAddBlockOfText}>Add block of text</button>
                <button type="button" className="btn btn-success" onClick={this.handleAddBlockOfImage}>Add block of image</button>
            </div>
        );
    }
}

export default connect(
    null,
    { addBlock, addExtensionToBlock, addBlockToPage, addTextExtension, addImageExtension }
)(NotepadBlockAdd)
