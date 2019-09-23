import { ADD_EXTENSION } from '../actions/extensions';

const initialState = {
    byId: {},
    allIds: []
};

export default function extensions(state = initialState, action) {
    switch (action.type) {
        case ADD_EXTENSION:
            return {
                byId: {
                    ...state.byId,
                    [action.id]: {
                        id: action.id,
                        type: action.extension_type,
                        content: ''
                    }
                },
                allIds: [
                    ...state.allIds,
                    action.id
                ]
            }
        default:
            return state;
    }
}
