import { ADD_PAGE, ADD_LINE_TO_PAGE, REMOVE_LINE_FROM_PAGE, SET_PAGE_DATA, CLEAR_PAGE_DATA, SET_PAGE_STATUS, SET_PAGE_CONTENT_STATUS, SELECT_PAGE } from '../actions/pages';

import { STATUS } from '../constants';

const initialState = {
    byId: {},
    allIds: [],
    status: STATUS.INIT,
    contentStatus: STATUS.INIT,
    selectedId: null
};

export default function pages(state = initialState, action) {
    switch (action.type) {
        case ADD_PAGE: {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: {
                        id: action.id,
                        title: action.title,
                        lines: []
                    }
                },
                allIds: [
                    ...state.allIds,
                    action.id
                ]
            }
        }
        case ADD_LINE_TO_PAGE: {
            const page = state.byId[action.pageId];
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.pageId]: {
                        ...page,
                        lines: [
                            ...page.lines,
                            action.lineId
                        ]
                    }
                },
                allIds: state.allIds
            }
        }
        case REMOVE_LINE_FROM_PAGE: {
            var page = state.byId[action.pageId];

            // Remove the line from the page
            var lineIndex = page.lines.indexOf(action.lineId);
            var newlines = [...page.lines];
            newlines.splice(lineIndex, 1);

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.pageId]: {
                        ...page,
                        lines: newlines
                    }
                },
                allIds: state.allIds
            }
        }
        case SET_PAGE_DATA: {
            return {
                ...state,
                ...action.pageData
            };
        }
        case SET_PAGE_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_PAGE_CONTENT_STATUS: {
            return {
                ...state,
                contentStatus: action.status
            }
        }
        case CLEAR_PAGE_DATA: {
            return initialState;
        }
        case SELECT_PAGE: {
            return {
                ...state,
                selectedId: action.id
            }
        }
        default:
            return state;
    }
}
