import axios from 'axios';
const API_URL = '/auth/';
class AuthService {
    login (email, password) {
        return axios
            .post(API_URL + 'signin', { email, password })
            .then((response) => {
                console.log('response: ', response.status)
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                console.log('AuthService.login: ', response.data);
                return response.data;
            });
    }

    restore (restoreEmail, newPassword) {
        return axios
            .post(API_URL + 'restorePassword', { restoreEmail, newPassword })
            .then((response) => {
                console.log('restore password: ', response.data);
                return response.data;
            });
    }

    logout () {
        localStorage.removeItem('user');
    }

    register (email, password, role) {
        return axios
            .post(API_URL + 'register', {
                email,
                password,
                role
            })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                console.log('AuthService.login: ', response.data);
                return response.data;
            });
    }
}
export default new AuthService();
