export const SET_USER_DATA = 'SET_USER_DATA';
export const CLEAR_DATA = 'CLEAR_DATA';
export const CLEAR_PENDING_ACTIONS = 'CLEAR_PENDING_ACTIONS';

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
