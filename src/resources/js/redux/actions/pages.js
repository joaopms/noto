import uuid from '../../utils/uuid';

import { STATUS } from '../constants';

export const ADD_PAGE = 'ADD_PAGE';
export const ADD_LINE_TO_PAGE = 'ADD_LINE_TO_PAGE';
export const REMOVE_LINE_FROM_PAGE = 'REMOVE_LINE_FROM_PAGE';
export const SET_PAGE_DATA = 'SET_PAGE_DATA';
export const CLEAR_PAGE_DATA = 'CLEAR_PAGE_DATA';
export const SET_PAGE_STATUS = 'SET_PAGE_STATUS';
export const SET_PAGE_CONTENT_STATUS = 'SET_PAGE_CONTENT_STATUS';
export const SELECT_PAGE = 'SELECT_PAGE';

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

export function clearPageData() {
    return {
        type: CLEAR_PAGE_DATA
    };
}

export function setLoadingStatus() {
    return {
        type: SET_PAGE_STATUS,
        status: STATUS.LOADING
    }
}

export function setLoadedStatus() {
    return {
        type: SET_PAGE_STATUS,
        status: STATUS.LOADED
    }
}

export function setLoadingContentStatus() {
    return {
        type: SET_PAGE_CONTENT_STATUS,
        status: STATUS.LOADING
    }
}

export function setLoadedContentStatus() {
    return {
        type: SET_PAGE_CONTENT_STATUS,
        status: STATUS.LOADED
    }
}

export function selectPage(id) {
    return {
        type: SELECT_PAGE,
        id
    }
}
