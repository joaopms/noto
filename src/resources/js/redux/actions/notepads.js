import uuid from '../../utils/uuid';

import { STATUS } from '../constants';

export const ADD_NOTEPAD = 'ADD_NOTEPAD';
export const ADD_PAGE_TO_NOTEPAD = 'ADD_PAGE_TO_NOTEPAD';
export const SET_NOTEPAD_DATA = 'SET_NOTEPAD_DATA';
export const SET_NOTEPAD_STATUS = 'SET_NOTEPAD_STATUS';
export const SELECT_NOTEPAD = 'SELECT_NOTEPAD';

export function addNotepad(title) {
    return {
        type: ADD_NOTEPAD,
        id: uuid(),
        title
    };
}

export function addPageToNotepad(notepadId, pageId) {
    return {
        type: ADD_PAGE_TO_NOTEPAD,
        notepadId,
        pageId
    };
}

export function setNotepadData(notepadData) {
    return {
        type: SET_NOTEPAD_DATA,
        notepadData
    };
}

export function setLoadingStatus() {
    return {
        type: SET_NOTEPAD_STATUS,
        status: STATUS.LOADING
    }
}

export function setLoadedStatus() {
    return {
        type: SET_NOTEPAD_STATUS,
        status: STATUS.LOADED
    }
}

export function selectNotepad(id) {
    return {
        type: SELECT_NOTEPAD,
        id
    }
}
