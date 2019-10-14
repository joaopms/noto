import uuidv4 from 'uuid/v4';
import { ADD_NOTEPAD, ADD_PAGE_TO_NOTEPAD, SET_NOTEPAD_DATA } from '../actions/notepads';

const initialState = {
    byId: {},
    allIds: []
};

export default function notepads(state = initialState, action) {
    switch (action.type) {
        case ADD_NOTEPAD:
            return {
                byId: {
                    ...state.byId,
                    [action.id]: {
                        id: action.id,
                        title: action.title,
                        pages: []
                    }
                },
                allIds: [
                    ...state.allIds,
                    action.id
                ]
            }
        case ADD_PAGE_TO_NOTEPAD:
            const notepad = state.byId[action.notepadId];
            return {
                byId: {
                    ...state.byId,
                    [action.notepadId]: {
                        ...notepad,
                        pages: [
                            ...notepad.pages,
                            action.pageId
                        ]
                    }
                },
                allIds: state.allIds
            }
        case SET_NOTEPAD_DATA: {
            return action.notepadData;
        }
        default:
            return state;
    }
}
