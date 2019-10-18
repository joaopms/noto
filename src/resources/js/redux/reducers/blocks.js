import { ADD_BLOCK, SET_BLOCK_CONTENT, SET_BLOCK_DATA, REMOVE_BLOCK } from '../actions/blocks';
import { CLEAR_PAGE_DATA } from '../actions/pages';

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
        case REMOVE_BLOCK: {
            var newState = {
                byId: {
                    ...state.byId
                },
                allIds: [
                    ...state.allIds
                ]
            };

            delete newState.byId[action.id];

            var blockIndex = newState.allIds.indexOf(action.id);
            newState.allIds.splice(blockIndex, 1);

            return newState;
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
        case CLEAR_PAGE_DATA: {
            return initialState;
        }
        default:
            return state;
    }
}
