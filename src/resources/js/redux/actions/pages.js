import uuid from '../../utils/uuid';

export const ADD_PAGE = 'ADD_PAGE';
export const ADD_LINE_TO_PAGE = 'ADD_LINE_TO_PAGE';
export const REMOVE_LINE_FROM_PAGE = 'REMOVE_LINE_FROM_PAGE';
export const SET_PAGE_DATA = 'SET_PAGE_DATA';

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

export function removeLineFromPage(pageId, lineId) {
    return {
        type: REMOVE_LINE_FROM_PAGE,
        pageId,
        lineId
    };
}

export function setPageData(pageData) {
    return {
        type: SET_PAGE_DATA,
        pageData
    };
}
