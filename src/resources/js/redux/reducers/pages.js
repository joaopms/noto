import { ADD_PAGE, ADD_LINE_TO_PAGE } from '../actions/pages';

const initialState = {
    byId: {},
    allIds: []
};

export default function pages(state = initialState, action) {
    switch (action.type) {
        case ADD_PAGE:
            return {
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
        case ADD_LINE_TO_PAGE:
            const page = state.byId[action.pageId];
            return {
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
        default:
            return state;
    }
}
