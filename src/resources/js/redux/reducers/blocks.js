import { ADD_BLOCK, SET_BLOCK_CONTENT } from '../actions/blocks';

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
                        type: action.block_type,
                        content: ''
                    }
                },
                allIds: [
                    ...state.allIds,
                    action.id
                ]
            }
        case SET_BLOCK_CONTENT:
            return {
                byId: {
                    ...state.byId,
                    [action.id]: {
                        ...state.byId[action.id],
                        content: action.content
                    }
                },
                allIds: state.allIds
            }
        default:
            return state;
    }
}
