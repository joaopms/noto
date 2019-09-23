import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addNotepad } from '../../redux/actions/notepads';

class NotepadAdd extends Component {
    constructor(props) {
        super(props);
        this.state = { title: '' };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleAddNotepad = this.handleAddNotepad.bind(this);
    }

    handleTitleChange(event) {
        this.setState({
            title: event.target.value
        });
    }

    handleAddNotepad() {
        if (!this.state.title) {
            return;
        }

        this.props.addNotepad(this.state.title);
        this.setState({ title: '' });
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Add a new notepad</h5>
                    <input type="text" className="form-control" value={this.state.title} onChange={this.handleTitleChange}></input>
                    <button type="button" className="btn btn-success" onClick={this.handleAddNotepad}>Add notepad</button>
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    { addNotepad }
)(NotepadAdd)
