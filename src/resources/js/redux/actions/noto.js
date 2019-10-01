import uuidv4 from 'uuid/v4';

export const SET_USER_DATA = 'SET_USER_DATA';

export function setUserData(userData) {
    return {
        type: SET_USER_DATA,
        userData
    };
}
