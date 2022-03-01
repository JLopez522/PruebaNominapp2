
import Utils from '../utils/utils';

const nameServer = Utils.getNameServer();

function getProduct(id) {
    return fetch(`${nameServer}/productos/${id}`, {
        method: 'GET'
    }).then((response) => response.json())
}

function insertProduct(input) {
    return fetch(`${nameServer}/productos`, {
        method: 'POST',
        body: JSON.stringify(input),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((response) => response.json())
}

function updateProduct(input) {
    return fetch(`${nameServer}/productos/${input.id}`, {
        method: 'PUT',
        body: JSON.stringify(input),
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((response) => response.json())
}

function deleteProduct(input) {
    return fetch(`${nameServer}/productos/${input.id}`, {
        method: 'DELETE'
    }).then((response) => response.json())
}

export default { getProduct, insertProduct, updateProduct, deleteProduct }