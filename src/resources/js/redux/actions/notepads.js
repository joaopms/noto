import uuid from '../../utils/uuid';

export const ADD_NOTEPAD = 'ADD_NOTEPAD';
export const ADD_PAGE_TO_NOTEPAD = 'ADD_PAGE_TO_NOTEPAD';
export const SET_NOTEPAD_DATA = 'SET_NOTEPAD_DATA';

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
