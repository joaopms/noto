import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addPage } from '../../../redux/actions/pages';
import { addPageToNotepad } from '../../../redux/actions/notepads';

class NotepadPageAdd extends Component {
    constructor(props) {
        super(props);
        this.state = { title: '' };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleAddPage = this.handleAddPage.bind(this);
    }

    handleTitleChange(event) {
        this.setState({
            title: event.target.value
        });
    }

    handleAddPage() {
        if (!this.state.title) {
            return;
        }

        const pageId = this.props.addPage(this.state.title).id;
        this.props.addPageToNotepad(this.props.notepadId, pageId);
        this.setState({ title: '' });
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Add a new page</h5>
                    <input type="text" className="form-control" value={this.state.title} onChange={this.handleTitleChange}></input>
                    <button type="button" className="btn btn-success" onClick={this.handleAddPage}>Add page</button>
                </div>
            </div>
        );
    }
}

export default connect(
    null,
    { addPage, addPageToNotepad }
)(NotepadPageAdd)
