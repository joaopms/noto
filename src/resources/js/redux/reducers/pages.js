import { ADD_PAGE } from '../actions/pages';

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
                        title: action.title
                    }
                },
                allIds: [
                    ...state.allIds,
                    action.id
                ]
            }
        default:
            return state;
    }
}
