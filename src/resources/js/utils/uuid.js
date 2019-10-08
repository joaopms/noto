import uuidv4 from 'uuid/v4';

export default function () {
    var uuid = uuidv4();
    return uuid.split('-').join("");
}
