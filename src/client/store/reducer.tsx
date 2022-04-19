import * as Immutable from 'immutable';
import { IUser } from '../interfaces/user.types';

const Map = Immutable.Map;

interface IAction {
    type: string
    state: any
}

const reducer = (state = Map(), action: IAction) => {
    switch (action.type) {
    case 'SET_STATE':
        return state.merge(action.state);
    case 'REGISTRATION_USER':
        return state.update('user', (user: IUser) => user);
    case 'LOGIN_USER':
        return state.update('user', (user: IUser) => user);
    case 'LOGOUT_USER' || 'REGISTER_FAIL' || 'LOGIN_FAIL':
        return state.update('user', () => {
            return {
                phone: '',
                email: '',
                firstname: '',
                lastname: '',
                roles: ''
            };
        });
    case 'SET_MESSAGE':
        return state.update('message', (message: string) => message);
    case 'CLEAR_MESSAGE':
        return state.update('message', () => '');
    }
    return state;
};

export default reducer;
