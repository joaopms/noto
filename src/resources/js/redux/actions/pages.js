import uuidv4 from 'uuid/v4';

export const ADD_PAGE = 'ADD_PAGE';
export const ADD_BLOCK_TO_PAGE = 'ADD_BLOCK_TO_PAGE';

export function addPage(title) {
    return {
        type: ADD_PAGE,
        id: uuidv4(),
        title
    };
}

export function addBlockToPage(pageId, blockId) {
    return {
        type: ADD_BLOCK_TO_PAGE,
        pageId,
        blockId
    };
}
