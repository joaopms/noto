import React, { Component } from 'react';

export default class ImageBlock extends Component {
    render() {
        return (
            <div className="block block--image">
                <img src={this.props.content} />
            </div>
        );
    }
}
