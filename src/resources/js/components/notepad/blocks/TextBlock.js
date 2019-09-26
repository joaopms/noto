import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setBlockContent } from '../../../redux/actions/blocks';

import BlockOptions from './BlockOptions';

function mapStateToProps(state, ownProps) {
    const block = state.blocks.byId[ownProps.blockId];

    return {
        content: block.content
    }
}

class TextBlock extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(ev) {
        this.props.setBlockContent(this.props.blockId, ev.target.textContent);
    }

    render() {
        return (
            <div className="block block--text" data-blockid={this.props.blockId} data-lineid={this.props.lineId}>
                <BlockOptions lineId={this.props.lineId} blockId={this.props.blockId} />
                <div className="block__content">
                    <div contentEditable="true" suppressContentEditableWarning="true" onBlur={this.handleChange}>
                        {this.props.content}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    { setBlockContent }
)(TextBlock)
