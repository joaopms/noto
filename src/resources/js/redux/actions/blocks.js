import uuidv4 from 'uuid/v4';

export const ADD_BLOCK = 'ADD_BLOCK';
export const ADD_EXTENSION_TO_BLOCK = 'ADD_EXTENSION_TO_BLOCK';

export function addBlock() {
    return {
        type: ADD_BLOCK,
        id: uuidv4()
    };
}

export function addExtensionToBlock(blockId, extensionId) {
    return {
        type: ADD_EXTENSION_TO_BLOCK,
        blockId,
        extensionId
    };
}
