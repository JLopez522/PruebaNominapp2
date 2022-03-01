
import Utils from '../utils/utils';

const nameServer = Utils.getNameServer();

function userExits(documento) {
    return fetch(`${nameServer}/usuarios?documento=${documento}`, {
        method: 'GET'
    }).then((response) => response.json())
}

function insertUser(input) {
    return fetch(`${nameServer}/usuarios`, {
        method: 'POST',
        body: JSON.stringify(input),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((response) => response.json())
}

export default { userExits, insertUser }