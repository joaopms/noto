import uuid from '../../utils/uuid';

import { TEXT_BLOCK, IMAGE_BLOCK } from '../../components/notepad/blocks';

export const ADD_BLOCK = 'ADD_BLOCK';
export const SET_BLOCK_CONTENT = 'SET_BLOCK_CONTENT';

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

export function setBlockContent(id, content) {
    return {
        type: SET_BLOCK_CONTENT,
        id,
        content
    };
}
