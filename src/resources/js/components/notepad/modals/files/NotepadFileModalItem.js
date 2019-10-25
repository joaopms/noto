import React, { Component } from 'react';

export default class NotepadFileModalItem extends Component {
    render() {
        return (
            <div className="file-list-item">
                <div className="file-list-item__checkbox">
                    <input type="checkbox"></input>
                </div>
                <div className="file-list-item__image">
                    <img src="http://placehold.it/48x48"></img>
                </div>
                <div className="file-list-item__info">
                    <div className="file-list-item__title">xD</div>
                    <div className="file-list-item__date text-muted">01/02/2012 02:32:34</div>
                </div>
                <div className="file-list-item__actions">
                    <button className="btn btn-sm">
                        <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 512"><path fill="currentColor" d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"></path></svg>
                    </button>
                </div>
            </div>
        )
    }
}
