import { SET_USER_DATA } from '../actions/noto';

const initialState = {
    loggedIn: false,
    user: {}
};

export default function blocks(state = initialState, action) {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                user: action.userData,
                loggedIn: true
            }
        default:
            return state;
    }
}
