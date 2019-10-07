import { SET_USER_DATA, CLEAR_DATA } from '../actions/noto';

const initialState = {
    loggedIn: false,
    user: {},
    pendingActions: []
};

function isActionSyncable(actionType) {
    return !actionType.startsWith('@') && actionType != SET_USER_DATA && actionType != CLEAR_DATA;
}

export default function blocks(state = initialState, action) {
    var newState = state;

    // Add the action to the pending actions
    if (isActionSyncable(action.type)) {
        newState = {
            ...state,
            pendingActions: [
                ...state.pendingActions,
                action
            ]
        }
    }

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...newState,
                user: action.userData,
                loggedIn: true
            }
        case CLEAR_DATA:
            return initialState;
        default:
            return newState;
    }
}
