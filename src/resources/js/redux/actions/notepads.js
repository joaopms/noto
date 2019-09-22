export const ADD_NOTEPAD = 'ADD_NOTEPAD';

export function addNotepad(title) {
    return { type: ADD_NOTEPAD, title };
}
