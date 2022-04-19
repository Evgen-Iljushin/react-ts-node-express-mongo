import axios from 'axios';
const API_URL = '/auth/';
class AuthService {
    login (username, password) {
        return axios
            .post(API_URL + 'signin', { username, password })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }
                console.log('AuthService.login: ', response.data);
                return response.data;
            });
    }

    logout () {
        localStorage.removeItem('user');
    }

    register (email, password) {
        return axios.post(API_URL + 'register', {
            email,
            password
        });
    }
}
export default new AuthService();
