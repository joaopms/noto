import uuid from '../../utils/uuid';

export const ADD_PAGE = 'ADD_PAGE';
export const ADD_LINE_TO_PAGE = 'ADD_LINE_TO_PAGE';

export function addPage(title) {
    return {
        type: ADD_PAGE,
        id: uuid(),
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
