import uuidv4 from 'uuid/v4';

export const ADD_PAGE = 'ADD_PAGE';
export const ADD_LINE_TO_PAGE = 'ADD_LINE_TO_PAGE';

export function addPage(title) {
    return {
        type: ADD_PAGE,
        id: uuidv4(),
        title
    };
}

export function addLineToPage(pageId, lineId) {
    return {
        type: ADD_LINE_TO_PAGE,
        pageId,
        lineId
    };
}
