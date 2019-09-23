import { ADD_BLOCK } from '../actions/blocks';

const initialState = {
    byId: {},
    allIds: []
};

export default function blocks(state = initialState, action) {
    switch (action.type) {
        case ADD_BLOCK:
            return {
                byId: {
                    ...state.byId,
                    [action.id]: {
                        id: action.id,
                        extensions: []
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
