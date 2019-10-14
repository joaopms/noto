import { ADD_BLOCK, SET_BLOCK_CONTENT, SET_BLOCK_DATA } from '../actions/blocks';

const initialState = {
    byId: {},
    allIds: []
};

export default function blocks(state = initialState, action) {
    switch (action.type) {
        case ADD_BLOCK: {
            return {
                byId: {
                    ...state.byId,
                    [action.id]: {
                        id: action.id,
                        type: action.blockType,
                        content: ''
                    }
                },
                allIds: [
                    ...state.allIds,
                    action.id
                ]
            }
        }
        case SET_BLOCK_CONTENT: {
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
        }
        case SET_BLOCK_DATA: {
            return action.blockData;
        }
        default:
            return state;
    }
}
