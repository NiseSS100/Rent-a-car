import axios from 'axios';

const apiUrl = 'http://localhost:3005/customer';

export function getAllUsers() {
    return axios.get(apiUrl);
}

export function getUserById(id) {
    return axios.get(`${apiUrl}/${id}`);
}

export function deleteUser(id) {
    return axios.delete(`${apiUrl}/${id}`);
}

export function saveUser(user) {
    if (!user.id) {
        console.log(user);
        return axios.post(apiUrl, user);
    }

    return axios.put(`${apiUrl}/${user.id}`, user);
}
