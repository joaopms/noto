import React, { Component } from 'react';

import BlockOptions from './BlockOptions';

export default class TextBlock extends Component {
    render() {
        return (
            <div className="block block--text">
                <BlockOptions lineId={this.props.lineId} blockId={this.props.blockId} />
                <div className="block__content">
                    <div contentEditable="true" suppressContentEditableWarning="true">
                        {this.props.content}
                    </div>
                </div>
            </div>
        );
    }
}