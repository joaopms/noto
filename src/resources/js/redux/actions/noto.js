import { SYNC_STATUS } from '../constants';

export const SET_USER_DATA = 'SET_USER_DATA';
export const CLEAR_DATA = 'CLEAR_DATA';
export const CLEAR_PENDING_ACTIONS = 'CLEAR_PENDING_ACTIONS';

export const PREPARE_SYNCING = 'PREPARE_SYNCING';
export const SYNC_START = 'SYNC_START';
export const SET_SYNC_STATUS = 'SET_SYNC_STATUS';
export const SUCCESSFULL_SYNC = 'SUCCESSFULL_SYNC';

export function setUserData(userData) {
    window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + userData.api_token;

    return {
        type: SET_USER_DATA,
        userData
    };
}

export function clearData() {
    return {
        type: CLEAR_DATA
    };
}

export function clearPendingActions() {
    return {
        type: CLEAR_PENDING_ACTIONS
    };
}

export function prepareSyncing() {
    return {
        type: PREPARE_SYNCING
    }
}

export function startSyncing() {
    return {
        type: SYNC_START,
        timestamp: Date.now()
    };
}

export function setSuccessfullSync() {
    return {
        type: SUCCESSFULL_SYNC,
        timestamp: Date.now()
    }
}

export function setFailedSync() {
    return {
        type: SET_SYNC_STATUS,
        status: SYNC_STATUS.FAILED
    }
}
