import uuid from '../../utils/uuid';

export const ADD_LINE = 'ADD_LINE';
export const REMOVE_LINE = 'REMOVE_LINE';
export const ADD_BLOCK_TO_LINE = 'ADD_BLOCK_TO_LINE';
export const REMOVE_BLOCK_FROM_LINE = 'REMOVE_BLOCK_FROM_LINE';
export const SET_LINE_DATA = 'SET_LINE_DATA';

export function addLine() {
    return {
        type: ADD_LINE,
        id: uuid()
    };
}

export function removeLine(id) {
    return {
        type: REMOVE_LINE,
        id
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

export function setLineData(lineData) {
    return {
        type: SET_LINE_DATA,
        lineData
    };
}
