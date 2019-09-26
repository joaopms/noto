import uuidv4 from 'uuid/v4';

export const ADD_LINE = 'ADD_LINE';
export const ADD_BLOCK_TO_LINE = 'ADD_BLOCK_TO_LINE';
export const REMOVE_BLOCK_FROM_LINE = 'REMOVE_BLOCK_FROM_LINE';

export function addLine() {
    return {
        type: ADD_LINE,
        id: uuidv4()
    };
}

export function addBlockToLine(lineId, blockId, previousBlockId, beforeBlock) {
    return {
        type: ADD_BLOCK_TO_LINE,
        lineId,
        blockId,
        previousBlockId,
        beforeBlock
    };
}

export function removeBlockFromLine(lineId, blockId) {
    return {
        type: REMOVE_BLOCK_FROM_LINE,
        lineId,
        blockId
    };
}
