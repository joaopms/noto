import uuidv4 from 'uuid/v4';
import { ADD_NOTEPAD, ADD_PAGE_TO_NOTEPAD, SET_NOTEPAD_DATA, SET_NOTEPAD_STATUS, SELECT_NOTEPAD } from '../actions/notepads';
import { STATUS } from '../constants';

const initialState = {
    byId: {},
    allIds: [],
    status: STATUS.INIT,
    selectedId: null
};

export default function notepads(state = initialState, action) {
    switch (action.type) {
        case ADD_NOTEPAD:
            return {
                ...state,
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
                ...state,
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
            return {
                ...state,
                ...action.notepadData
            }
        }
        case SET_NOTEPAD_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SELECT_NOTEPAD: {
            return {
                ...state,
                selectedId: action.id
            }
        }
        default:
            return state;
    }
}
