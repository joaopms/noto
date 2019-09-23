import { ADD_BLOCK, ADD_EXTENSION_TO_BLOCK } from '../actions/blocks';

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
        case ADD_EXTENSION_TO_BLOCK:
            const block = state.byId[action.blockId];
            return {
                byId: {
                    ...state.byId,
                    [action.blockId]: {
                        ...block,
                        extensions: [
                            ...block.extensions,
                            action.extensionId
                        ]
                    }
                },
                allIds: state.allIds
            }
        default:
            return state;
    }
}
