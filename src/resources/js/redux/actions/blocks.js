import uuidv4 from 'uuid/v4';

import { TEXT_BLOCK, IMAGE_BLOCK } from '../../components/notepad/blocks';

export const ADD_BLOCK = 'ADD_BLOCK';

export function addTextBlock() {
    return {
        type: ADD_BLOCK,
        id: uuidv4(),
        block_type: TEXT_BLOCK
    };
}

export function addImageBlock() {
    return {
        type: ADD_BLOCK,
        id: uuidv4(),
        block_type: IMAGE_BLOCK
    };
}
