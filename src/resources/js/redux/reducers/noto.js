import { SET_USER_DATA, CLEAR_DATA, CLEAR_PENDING_ACTIONS, PREPARE_SYNCING, SYNC_START, SET_SYNC_STATUS, SUCCESSFULL_SYNC } from '../actions/noto';
import { SYNC_STATUS } from '../constants';

const initialState = {
    loggedIn: false,
    user: {},
    sync: {
        syncStart: null,
        syncEnd: null,
        status: SYNC_STATUS.INIT,
        pendingActions: [],
        syncingActions: []
    }
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
            sync: {
                ...state.sync,
                pendingActions: [
                    ...state.sync.pendingActions,
                    action
                ]
            }
        }
    }

    switch (action.type) {
        case SET_USER_DATA: {
            return {
                ...newState,
                user: action.userData,
                loggedIn: true
            }
        }
        case CLEAR_DATA: {
            return initialState;
        }
        case CLEAR_PENDING_ACTIONS: {
            return {
                ...state,
                sync: {
                    ...state.sync,
                    pendingActions: []
                }
            }
        }
        case PREPARE_SYNCING: {
            return {
                ...state,
                sync: {
                    ...state.sync,
                    pendingActions: [],
                    syncingActions: state.sync.pendingActions
                }
            }
        }
        case SYNC_START: {
            return {
                ...state,
                sync: {
                    ...state.sync,
                    syncStart: action.timestamp,
                    status: SYNC_STATUS.SYNCING
                }
            }
        }
        case SET_SYNC_STATUS: {
            return {
                ...state,
                sync: {
                    ...state.sync,
                    status: action.status
                }
            }
        }
        case SUCCESSFULL_SYNC: {
            return {
                ...state,
                sync: {
                    ...state.sync,
                    syncEnd: action.timestamp,
                    status: SYNC_STATUS.SYNCED,
                    syncingActions: []
                }
            }
        }
        default:
            return newState;
    }
}
