import { ADD_LINE, ADD_BLOCK_TO_LINE, REMOVE_BLOCK_FROM_LINE, SET_LINE_DATA } from '../actions/lines';

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
            var line = state.byId[action.lineId];
            var previousBlockId = action.previousBlockId;

            var newBlocks = [...line.blocks];
            var beforeBlock = action.beforeBlock;
            // Add the block before/after the one provided
            // Or add it to the begininng/end of the line
            if (previousBlockId) {
                var previousBlockIndex = line.blocks.indexOf(previousBlockId);
                if (beforeBlock) {
                    newBlocks.splice(previousBlockIndex, 0, action.blockId);
                } else {
                    newBlocks.splice(previousBlockIndex + 1, 0, action.blockId);
                }
            } else {
                if (beforeBlock) {
                    newBlocks.unshift(action.blockId);
                } else {
                    newBlocks.push(action.blockId);
                }
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
        case REMOVE_BLOCK_FROM_LINE:
            var line = state.byId[action.lineId];

            // If only one block exists, remove the line
            if (line.blocks.length === 1) {
                // TODO
            }

            // Remove the block from the line
            var blockIndex = line.blocks.indexOf(action.blockId);
            var newBlocks = [...line.blocks];
            newBlocks.splice(blockIndex, 1);

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
        case SET_LINE_DATA: {
            return action.lineData;
        }
        default:
            return state;
    }
}
