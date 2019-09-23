import React, { Component } from 'react';
import { connect } from 'react-redux';

import NotepadPageAdd from './NotepadPageAdd';

function mapStateToProps(state, ownProps) {
    const notepadId = ownProps.match.params.notepadId;
    const notepad = state.notepads.byId[notepadId];
    const pages = notepad.pages.map(pageId => state.pages.byId[pageId]);
    console.log(pages);

    return {
        notepad,
        pages
    }
}

class NotepadPageList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const pageList = this.props.pages.map(page =>
            <li key={page.id}>
                <a href="#">{page.title}</a>
            </li>
        );

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
    null
)(NotepadPageList)
