
import Utils from '../utils/utils';

const nameServer = Utils.getNameServer();

function login(input) {
    return fetch(`${nameServer}/usuarios?documento=${input.documento}&password=${input.password}`, {
        method: 'GET'
    }).then((response) => response.json())
}

export default { login }