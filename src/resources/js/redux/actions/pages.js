import uuidv4 from 'uuid/v4';

export const ADD_PAGE = 'ADD_PAGE';

export function addPage(title) {
    return {
        type: ADD_PAGE,
        id: uuidv4(),
        title
    };
}
