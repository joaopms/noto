export const SET_USER_DATA = 'SET_USER_DATA';
export const CLEAR_DATA = 'CLEAR_DATA';

export function setUserData(userData) {
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
