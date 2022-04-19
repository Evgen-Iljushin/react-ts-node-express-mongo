import { ICompany } from '../interfaces/company.types';
import AuthService from '../services/auth.services';

export const addCompany = (company: ICompany) => {
    return {
        type: 'ADD_COMPANY',
        company
    };
};

export const deleteCompany = (company: ICompany) => {
    return {
        type: 'DELETE_COMPANY',
        company
    };
};

export const registrationUser = (data, dispatch) => {
    dispatch({
        type: 'SET_MESSAGE',
        message: 'User successfully registered'
    });
    return {
        type: 'REGISTRATION_USER',
        user: data
    };
};

export const loginUser = (data, dispatch) => {
    dispatch({
        type: 'SET_MESSAGE',
        message: 'User successfully login'
    });
    return {
        type: 'LOGIN_USER',
        user: data
    };
};

export const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({
        type: 'LOGOUT_USER'
    });
};

export const setMessage = (message) => ({
    type: 'SET_MESSAGE',
    message
});

export const clearMessage = () => ({
    type: 'CLEAR_MESSAGE'
});
