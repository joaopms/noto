import uuid from '../../utils/uuid';

import { TEXT_BLOCK, IMAGE_BLOCK } from '../../components/notepad/blocks';

export const ADD_BLOCK = 'ADD_BLOCK';
export const REMOVE_BLOCK = 'REMOVE_BLOCK';
export const SET_BLOCK_CONTENT = 'SET_BLOCK_CONTENT';
export const SET_BLOCK_DATA = 'SET_BLOCK_DATA';

export function addTextBlock() {
    return {
        type: ADD_BLOCK,
        id: uuid(),
        blockType: TEXT_BLOCK
    };
}

export function addImageBlock() {
    return {
        type: ADD_BLOCK,
        id: uuid(),
        blockType: IMAGE_BLOCK
    };
}

export function removeBlock(id) {
    return {
        type: REMOVE_BLOCK,
        id
    };
}

export function setBlockContent(id, content) {
    return {
        type: SET_BLOCK_CONTENT,
        id,
        content
    };
}

export function setBlockData(blockData) {
    return {
        type: SET_BLOCK_DATA,
        blockData
    };
}
