import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setPageData } from '../../../redux/actions/pages';

import NotepadPageAdd from './NotepadPageAdd';

function mapStateToProps(state, ownProps) {
    const notepadId = ownProps.match.params.notepadId;
    const notepad = state.notepads.byId[notepadId];
    const pages = notepad.pages.map(pageId => state.pages.byId[pageId]);

    return {
        notepad,
        pages
    }
}

class NotepadPageList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Load the pages from the server
        // TODO Handle this better
        axios.post('/api/getPages', { notepad_id: this.props.notepad.id })
            .then(response => this.props.setPageData(response.data))
            .then(error => console.error(error));
    }

    render() {
        var pageList = [];

        if (this.props.pages.length) {
            pageList = this.props.pages.filter(page => page).map(page =>
                <li key={page.id}>
                    <Link to={'/notepad/' + this.props.notepad.id + '/page/' + page.id}>{page.title}</Link>
                </li>
            );
        }

        return (
            <div>
                <h2>{this.props.notepad.title}</h2>
                <NotepadPageAdd notepadId={this.props.notepad.id} />
                <ul>
                    {pageList}
                </ul>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    { setPageData }
)(NotepadPageList)
