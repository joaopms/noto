import { ADD_BLOCK } from '../actions';

const initialState = {
    1: {
        name: 'Notepad name goes here',
        blocks: []
    }
};

export default function notepads(state = initialState, action) {
    switch (action.type) {
        case ADD_BLOCK:
            return {
                ...state,
                1: {
                    ...state[1],
                    blocks: [
                        ...state[1].blocks,
                        {
                            id: 10,
                            extensions: [
                                {
                                    id: 1,
                                    type: 'ImageBlockExtension',
                                    image: 'https://place-hold.it/2000x100'
                                }
                            ]
                        },
                    ]
                }
            }
        default:
            return state;
    }
}
