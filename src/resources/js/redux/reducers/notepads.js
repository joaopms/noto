import uuidv4 from 'uuid/v4';
import { ADD_NOTEPAD } from '../actions/notepads';

const initialState = [];

export default function notepads(state = initialState, action) {
    switch (action.type) {
        case ADD_NOTEPAD:
            return [
                ...state,
                {
                    id: uuidv4(),
                    title: action.title
                }
            ]
        default:
            return state;
    }
}
