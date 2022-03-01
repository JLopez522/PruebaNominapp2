
import Utils from '../utils/utils';

const nameServer = Utils.getNameServer();

function getProducts() {
    return fetch(`${nameServer}/productos`, {
        method: 'GET'
    }).then((response) => response.json())
}

export default { getProducts }