import React, { Component } from 'react';

import BlockOptions from './BlockOptions';

export default class ImageBlock extends Component {
    render() {
        return (
            <div className="block block--image" data-blockid={this.props.blockId} data-lineid={this.props.lineId}>
                <BlockOptions lineId={this.props.lineId} blockId={this.props.blockId} />
                <img src={this.props.content} />
            </div>
        );
    }
}
