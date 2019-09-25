import { ADD_LINE, ADD_BLOCK_TO_LINE } from '../actions/lines';

const initialState = {
    byId: {},
    allIds: []
};

export default function lines(state = initialState, action) {
    switch (action.type) {
        case ADD_LINE:
            return {
                byId: {
                    ...state.byId,
                    [action.id]: {
                        id: action.id,
                        blocks: []
                    }
                },
                allIds: [
                    ...state.allIds,
                    action.id
                ]
            }
        case ADD_BLOCK_TO_LINE:
            const line = state.byId[action.lineId];
            const previousBlockId = action.previousBlockId;

            var newBlocks = [...line.blocks];
            // Add the block after the one provided
            if (previousBlockId) {
                const previousBlockIndex = line.blocks.indexOf(previousBlockId);
                newBlocks.splice(previousBlockIndex + 1, 0, action.blockId);
            }

            return {
                byId: {
                    ...state.byId,
                    [action.lineId]: {
                        ...line,
                        blocks: newBlocks
                    }
                },
                allIds: state.allIds
            }
        default:
            return state;
    }
}
