import React, { Component } from 'react';

export default class TextBlockExtension extends Component {
    render() {
        return (
            <div className="extension extension--text">
                <div contentEditable="true" suppressContentEditableWarning="true">
                    {this.props.content}
                </div>
            </div>
        );
    }
}
