import uuidv4 from 'uuid/v4';

export const ADD_BLOCK = 'ADD_BLOCK';

export function addBlock() {
    return {
        type: ADD_BLOCK,
        id: uuidv4()
    };
}
