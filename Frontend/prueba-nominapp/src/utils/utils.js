import Cookies from 'universal-cookie';

const cookies = new Cookies();
const nameServer = 'http://localhost:3001';

function getNameServer() {
    return nameServer;
}

function setCookie(name, params) {
    cookies.set(name, JSON.stringify(params), { path: '/' });
}

function getCookie(name) {
    return cookies.get(name);
}

function removeCookie(name) {
    return cookies.remove(name, { path: '/' });
}

export default { getNameServer, setCookie, getCookie, removeCookie };