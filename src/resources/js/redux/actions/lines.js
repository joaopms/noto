import uuidv4 from 'uuid/v4';

export const ADD_LINE = 'ADD_LINE';
export const ADD_EXTENSION_TO_LINE = 'ADD_EXTENSION_TO_LINE';

export function addLine() {
    return {
        type: ADD_LINE,
        id: uuidv4()
    };
}

export function addExtensionToLine(lineId, extensionId) {
    return {
        type: ADD_EXTENSION_TO_LINE,
        lineId,
        extensionId
    };
}
