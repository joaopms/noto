import uuidv4 from 'uuid/v4';

import { TEXT_EXTENSION, IMAGE_EXTENSION } from '../../components/notepad/extensions';

export const ADD_EXTENSION = 'ADD_EXTENSION';

export function addTextExtension() {
    return {
        type: ADD_EXTENSION,
        id: uuidv4(),
        extension_type: TEXT_EXTENSION
    };
}

export function addImageExtension() {
    return {
        type: ADD_EXTENSION,
        id: uuidv4(),
        extension_type: IMAGE_EXTENSION
    };
}
