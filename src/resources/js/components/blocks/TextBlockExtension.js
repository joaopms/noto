import React, { Component } from 'react';

export default class TextBlockExtension extends Component {
    render() {
        return (
            <div contentEditable="true" suppressContentEditableWarning="true" className="text">
                {this.props.text}
            </div>
        );
    }
}
