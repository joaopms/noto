import React, { Component } from 'react';

export default class ImageBlockExtension extends Component {
    render() {
        return (
            <div className="extension extension--image">
                <img src={this.props.image} />
            </div>
        );
    }
}
