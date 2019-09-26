import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addBlockToLine, removeBlockFromLine } from '../../../redux/actions/lines';
import { addTextBlock, addImageBlock } from '../../../redux/actions/blocks';

class BlockOptions extends Component {
    constructor(props) {
        super(props);

        this.handleAddBlockOfText = this.handleAddBlockOfText.bind(this);
        this.handleAddBlockOfImage = this.handleAddBlockOfImage.bind(this);
        this.bro = this.bro.bind(this);
        this.broa = this.broa.bind(this);
    }

    handleAddBlockOfText() {
        const blockId = this.props.addTextBlock().id;
        this.props.addBlockToLine(this.props.lineId, blockId, this.props.blockId, false);
    }

    handleAddBlockOfImage() {
        const blockId = this.props.addImageBlock().id;
        this.props.addBlockToLine(this.props.lineId, blockId, this.props.blockId, false);
    }

    bro(ev) {
        console.log(ev);
    }

    broa(ev) {
        // TODO Ver os valores que o onTouchEnd devolve para descobrir o elemento onde caiu
        var target = document.elementFromPoint(ev.clientX, ev.clientY);

        // Find the block element
        while (!target.classList.contains("block")) {
            target = target.parentElement;

            // If no block was found, exit
            if (!target) {
                return;
            }
        }

        var targetRect = target.getBoundingClientRect();
        var targetBlockId = target.getAttribute("data-blockid");
        var targetLineId = target.getAttribute("data-lineid");
        var targetMiddle = (targetRect.right + window.scrollX) - targetRect.width / 2;

        var addBeforeBlock = ev.clientX < targetMiddle;
        this.props.removeBlockFromLine(this.props.lineId, this.props.blockId);
        this.props.addBlockToLine(targetLineId, this.props.blockId, targetBlockId, addBeforeBlock);
    }

    render() {
        return (
            <div className="block__options" draggable onDragStart={this.bro} onTouchMove={this.bro} onDragEnd={this.broa} onTouchEnd={this.broa}>
                <div className="btn-group btn-group-sm" role="group">
                    <button type="button" className="btn btn-outline-secondary" tabIndex="-1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {/* Add button */}
                        <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
                    </button>
                    <div className="dropdown-menu">
                        <button type="button" className="dropdown-item" onClick={this.handleAddBlockOfText}>Text</button>
                        <button type="button" className="dropdown-item" onClick={this.handleAddBlockOfImage}>Image</button>
                    </div>
                    <button type="button" className="btn btn-outline-secondary" tabIndex="-1">
                        {/* More options button */}
                        <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="currentColor" d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"></path></svg>
                    </button>
                </div>
            </div >
        );
    }
}

export default connect(
    null,
    { addBlockToLine, removeBlockFromLine, addTextBlock, addImageBlock }
)(BlockOptions)
