import { SET_USER_DATA, CLEAR_DATA } from '../actions/noto';

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
        case CLEAR_DATA:
            return initialState;
        default:
            return state;
    }
}
