import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://mywebfactory.in/bobbysweet/api/';

const encode = encodeURIComponent;
const responseBody = res => JSON.parse(res.text);

let token = null;
const tokenPlugin = req => {
    if (token) {
        req.set('authorization', `Token ${token}`);
    }
}

const requests = {
    del: url =>
        superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    get: url =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    put: (url, body) =>
        superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    post: (url, body) => {
        console.log(url);
        return superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
    }
};


// const headers = {
//     'Content-Type': 'application/json',
// };

// const requests = {
//     del: url =>
//         fetch(`${API_ROOT}${url}`, {
//             method: 'DELETE',
//             headers: headers
//         }).then(response => response.json()),
//     get: url =>
//         fetch(`${API_ROOT}${url}`, {
//             headers: headers
//         }).then(response => response.json()),
//     put: (url, body) =>
//         fetch(`${API_ROOT}${url}`, {
//             method: 'PUT',
//             headers: headers,
//             body: JSON.stringify(body)
//         }).then(response => response.json()),
//     post: (url, body) => {
//         fetch(`${API_ROOT}${url}`, {
//             method: 'POST',
//             headers: headers,
//             body: JSON.stringify(body)
//         }).then(response => response.json())
//     },
// };

const Auth = {
    current: () =>
        requests.get('/user'),
    login: (mobile) =>
        requests.post(`?type=login&mobile=${mobile}`, {}),
    verify: (mobile, otp) =>
        requests.post(`?type=otp_check&mobile=${mobile}&otp=${otp}`, {}),
    save: user =>
        requests.put('/user', { user })
};

export default { Auth };