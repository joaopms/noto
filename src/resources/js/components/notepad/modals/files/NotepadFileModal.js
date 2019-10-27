import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addImageBlock, setBlockContent } from '../../../../redux/actions/blocks';
import { addLine, addBlockToLine } from '../../../../redux/actions/lines';
import { addLineToPage } from '../../../../redux/actions/pages';

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
            activeTab: 'files',
            files: null,
            selectedFiles: []
        };

        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.selectFile = this.selectFile.bind(this);
        this.handleAddToPageClick = this.handleAddToPageClick.bind(this);
    }

    componentDidMount() {
        this.getFiles(this.state.activeTab);
    }

    async getFiles(tabType) {
        this.setState({ files: null, selectedFiles: [] });

        // Capitalize the first letter of the tab type
        const fileType = tabType[0].toUpperCase() + tabType.slice(1);

        try {
            const { data } = await axios.get(`/api/get${fileType}`);
            this.setState({ files: data });
        } catch (error) {
            console.error(error);
        }
    }

    async handleFileUpload(e) {
        e.preventDefault();

        const files = e.target.file.files;
        if (files.length < 1) {
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
            const response = await axios.post('/api/uploadFiles', formData);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }

    handleTabClick(tabType) {
        this.setState({
            activeTab: tabType
        });

        this.getFiles(tabType);
    }

    selectFile(id) {
        var selectedFiles = [...this.state.selectedFiles];
        const fileIndex = selectedFiles.indexOf(id);
        if (fileIndex > -1) {
            selectedFiles.splice(fileIndex, 1);
        } else {
            selectedFiles.push(id);
        }

        this.setState({
            selectedFiles: selectedFiles
        });
    }

    handleAddToPageClick() {
        // Close the modal
        // TODO

        var imagesToAdd = [];
        if (this.state.activeTab === 'files') {
            this.state.selectedFiles.forEach(fileId => {
                const file = this.state.files.byId[fileId];
                file.pages.forEach(pageId => {
                    imagesToAdd.push(pageId);
                });
            });
        } else if (this.state.activeTab === 'images') {
            imagesToAdd = [...this.state.selectedFiles];
        }

        // Clear the selected files
        this.setState({ selectedFiles: [] });

        // Add the images to the page
        imagesToAdd.forEach(image => {
            const imageUrl = image + '.png';
            const blockId = this.props.addImageBlock().id;
            this.props.setBlockContent(blockId, imageUrl);
            const lineId = this.props.addLine().id;
            this.props.addBlockToLine(lineId, blockId, null, false);
            this.props.addLineToPage(this.props.selectedPage, lineId);
        });
    }

    render() {
        var files = 'Loading...';

        if (this.state.files) {
            files = this.state.files.allIds.map(fileId => this.state.files.byId[fileId]).map(file => (
                <NotepadFileModalItem key={file.id} file={file} selectFile={this.selectFile} selected={this.state.selectedFiles.indexOf(file.id) > -1} />
            ))
        }

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
                                    {files}
                                </ul>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className={'btn btn-primary' + (this.state.selectedFiles.length < 1 ? ' disabled' : '')} disabled={this.state.selectedFiles.length < 1} onClick={this.handleAddToPageClick}>Add to page</button>
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
    { addImageBlock, setBlockContent, addLine, addBlockToLine, addLineToPage }
)(NotepadFileModal);
