import React, { Component } from 'react';

export default class ImageBlockExtension extends Component {
    render() {
        return (
            <img src={this.props.image} />
        );
    }
}
