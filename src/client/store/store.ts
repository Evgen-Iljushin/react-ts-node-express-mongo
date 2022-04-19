import * as Redux from 'redux';
import reducer from './reducer';
import { IUser } from '../interfaces/user.types';
import axios from 'axios';

const store = Redux.createStore(reducer);

const localStorageData = localStorage.getItem('user');

let getUserData: IUser | null = null;

if (localStorageData) {
    getUserData = JSON.parse(localStorageData).user as IUser;
    const authToken = JSON.parse(localStorageData).accessToken;
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;
}

const userData: IUser = getUserData || {
    phone: '',
    email: '',
    firstname: '',
    lastname: '',
    roles: ''
};

store.dispatch({
    type: 'SET_STATE',
    state: {
        user: userData,
        message: ''
    }
});

const setStore = () => {
    console.log('set store');
    return store;
};

export default setStore;
