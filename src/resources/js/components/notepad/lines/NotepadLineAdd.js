import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addLine, addExtensionToLine } from '../../../redux/actions/lines';
import { addLineToPage } from '../../../redux/actions/pages';
import { addTextExtension, addImageExtension } from '../../../redux/actions/extensions';

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
        const extensionId = this.props.addTextExtension().id;
        this.props.addExtensionToLine(lineId, extensionId);
    }

    handleAddLineOfImage() {
        const lineId = this.addLine();
        const extensionId = this.props.addImageExtension().id;
        this.props.addExtensionToLine(lineId, extensionId);
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
    { addLine, addExtensionToLine, addLineToPage, addTextExtension, addImageExtension }
)(NotepadLineAdd)
