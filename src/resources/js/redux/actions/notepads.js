import uuidv4 from 'uuid/v4';

export const ADD_NOTEPAD = 'ADD_NOTEPAD';
export const ADD_PAGE_TO_NOTEPAD = 'ADD_PAGE_TO_NOTEPAD';

export function addNotepad(title) {
    return {
        type: ADD_NOTEPAD,
        id: uuidv4(),
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
