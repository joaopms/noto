import React, { Component } from 'react';
import { connect } from 'react-redux';

import NotepadFileModalItem from './NotepadFileModalItem';

function mapStateToProps(state) {
    const selectedNotepad = state.notepads.selectedId;
    const selectedPage = state.pages.selectedId;

    return {
        selectedNotepad,
        selectedPage
    }
}

class NotepadFileModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: "files"
        }

        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    async handleFileUpload(e) {
        e.preventDefault();

        const files = e.target.file.files;
        if (files.length < 0) {
            return;
        }

        // Prepare the data
        const formData = new FormData();
        formData.append('notepadId', this.props.selectedNotepad);
        formData.append('pageId', this.props.selectedPage);
        for (var i = 0; i < files.length; i++) {
            formData.append('file[]', files[i]);
        }

        try {
            const response = axios.post('/api/uploadFiles', formData);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    handleTabClick(tabType) {
        this.setState({
            activeTab: tabType
        });
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#fileModal">Files & Images</button>

                <div className="modal fade" id="fileModal" tabIndex="-1" role="dialog" aria-labelledby="fileModalTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-scrollable" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="fileModalTitle">
                                    Files & Images
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form className="file-upload" onSubmit={this.handleFileUpload}>
                                    <div className="file-upload__row">
                                        <input type="file" name="file" accept=".pdf, .jpg, .jpeg, .png" multiple />
                                        <button className="btn btn-sm btn-success" type="submit">Upload</button>
                                    </div>
                                    <div className="file-upload__limit">Upload limit: 25 files</div>
                                </form>
                                <nav className="nav nav-pills nav-fill modal__tabs">
                                    <a className={"nav-item nav-link" + (this.state.activeTab === "files" ? " active" : "")} href="#" onClick={this.handleTabClick.bind(this, "files")}>Files</a>
                                    <a className={"nav-item nav-link" + (this.state.activeTab === "images" ? " active" : "")} href="#" onClick={this.handleTabClick.bind(this, "images")}>Images</a>
                                </nav>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <NotepadFileModalItem />
                                    </li>
                                    <li className="list-group-item">
                                        <NotepadFileModalItem />
                                    </li>
                                    <li className="list-group-item">
                                        <NotepadFileModalItem />
                                    </li>
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary">Add to page</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    null
)(NotepadFileModal);
