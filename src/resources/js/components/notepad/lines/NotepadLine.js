import React, { Component } from 'react';

export default class NotepadLine extends Component {
    render() {
        const wrappedChildren = React.Children.map(this.props.children, block => {
            return (
                <div className="col">{block}</div>
            );
        });

        return (
            <div className="line row">
                {wrappedChildren}
            </div>
        );
    }
}
