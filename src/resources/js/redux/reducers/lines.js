import { ADD_LINE, ADD_EXTENSION_TO_LINE } from '../actions/lines';

const initialState = {
    byId: {},
    allIds: []
};

export default function lines(state = initialState, action) {
    switch (action.type) {
        case ADD_LINE:
            return {
                byId: {
                    ...state.byId,
                    [action.id]: {
                        id: action.id,
                        extensions: []
                    }
                },
                allIds: [
                    ...state.allIds,
                    action.id
                ]
            }
        case ADD_EXTENSION_TO_LINE:
            const line = state.byId[action.lineId];
            return {
                byId: {
                    ...state.byId,
                    [action.lineId]: {
                        ...line,
                        extensions: [
                            ...line.extensions,
                            action.extensionId
                        ]
                    }
                },
                allIds: state.allIds
            }
        default:
            return state;
    }
}
