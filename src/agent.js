import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import { add } from 'react-native-reanimated';


const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://bsadmin.techpex.com/api/';

const encode = encodeURIComponent;
const responseBody = res => JSON.parse(res.text);

let token = null;
let userId = null;
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


const Auth = {
    fetchUser: (user_id) =>
        requests.post(`?type=profile_data&user_id=${user_id}`, {}),
    updateUser: (user_id, name, email, mobile) =>
        requests.post(`?type=updateprofile&user_id=${user_id}&name=${name}&email=${email}&mobile=${mobile}`, {}),
    login: (mobile) =>
        requests.post(`?type=login&mobile=${mobile}`, {}),
    verify: (mobile, otp) =>
        requests.post(`?type=otp_check&mobile=${mobile}&otp=${otp}`, {})
};


const Category = {
    all: () => requests.post('?type=catlist'),
    products: (categoryId) => requests.post(`?type=productlist&cat_id=${categoryId}`)
}

const Address = {
    all: () => requests.post(`?type=addresslist&user_id=${userId}`, {}),
    save: (address) =>
        requests.post(`?type=addaddress&default=${address.default}
        &user_id=${userId}&address_type=${address.address_type}
        &name=${address.name || ""}&house_no=${address.house_no || ""}
        &address=${address.address || ""}&landmark=${address.landmark || ""}
        &country=${address.country || ""}&state=${address.state || ""}
        &city=${address.city || ""}&pincode=${address.pincode || ""}
        &mobile=${address.mobile || ""}`, {}),
    update: (address) =>
        requests.post(`?type=updateaddress&default=${address.default}
        &address_id=${address.id}&address_type=${address.address_type}
        &name=${address.name || ""}&house_no=${address.house_no || ""}
        &address=${address.address || ""}&landmark=${address.landmark || ""}
        &country=${address.country || ""}&state=${address.state || ""}
        &city=${address.city || ""}&pincode=${address.pincode || ""}
        &mobile=${address.mobile || ""}`, {}),
    delete: (address_id) =>
        requests.post(`?type=deleteaddress&address_id=${address_id}`, {})
}
export default {
    Auth,
    Category,
    Address,
    setUserId: _userId => { userId = _userId; }
};