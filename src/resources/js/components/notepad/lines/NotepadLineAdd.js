import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addLine, addBlockToLine } from '../../../redux/actions/lines';
import { addLineToPage } from '../../../redux/actions/pages';
import { addTextBlock, addImageBlock } from '../../../redux/actions/blocks';

class NotepadLineAdd extends Component {
    constructor(props) {
        super(props);

        this.addLine = this.addLine.bind(this);
        this.handleAddLineOfText = this.handleAddLineOfText.bind(this);
        this.handleAddLineOfImage = this.handleAddLineOfImage.bind(this);
    }

    addLine() {
        const lineId = this.props.addLine().id;
        this.props.addLineToPage(this.props.pageId, lineId);
        return lineId;
    }

    handleAddLineOfText() {
        const lineId = this.addLine();
        const blockId = this.props.addTextBlock().id;
        this.props.addBlockToLine(lineId, blockId);
        this.props.addBlockToLine(lineId, blockId);
    }

    handleAddLineOfImage() {
        const lineId = this.addLine();
        const blockId = this.props.addImageBlock().id;
        this.props.addBlockToLine(lineId, blockId);
        this.props.addBlockToLine(lineId, blockId);
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-success" onClick={this.handleAddLineOfText}>Add line of text</button>
                <button type="button" className="btn btn-success" onClick={this.handleAddLineOfImage}>Add line of image</button>
            </div>
        );
    }
}

export default connect(
    null,
    { addLine, addBlockToLine, addLineToPage, addTextBlock, addImageBlock }
)(NotepadLineAdd)
