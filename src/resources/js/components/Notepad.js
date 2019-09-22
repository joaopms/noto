import React, { Component } from 'react';

export default class Notepad extends Component {
    render() {
        return (
            <div className="notepad">
                {this.props.children}
            </div>
        );
    }
}
