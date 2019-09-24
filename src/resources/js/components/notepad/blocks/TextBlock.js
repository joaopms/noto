import React, { Component } from 'react';

export default class TextBlock extends Component {
    render() {
        return (
            <div className="block block--text">
                <div contentEditable="true" suppressContentEditableWarning="true">
                    {this.props.content}
                </div>
            </div>
        );
    }
}
