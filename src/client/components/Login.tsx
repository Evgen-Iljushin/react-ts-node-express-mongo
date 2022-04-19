import * as React from 'react';
import * as CSS from 'csstype';
import * as ReactRedux from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { loginUser } from '../store/actions';
import AuthService from '../services/auth.services';

const connect = ReactRedux.connect;

interface Props {
    dispatch: any
    history?: any
}

const styleComponent: CSS.Properties = {
    display: 'grid',
    textAlign: 'center'
};

class Login extends React.Component<Props, any> {
    constructor (props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            email: '',
            password: ''
        };
    }

    onChangeEmail (e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword (e) {
        this.setState({
            password: e.target.value
        });
    }

    async handleLogin (e) {
        e.preventDefault();
        this.setState({
            loading: true
        });

        const { dispatch } = this.props;
        const loginData = await AuthService.login(this.state.email, this.state.password);
        console.log('loginData: ', loginData);
        dispatch(loginUser(loginData.user, dispatch));
        document.location.replace('/');
    }

    render () {
        return (
            <div style={styleComponent}>
                <h2>Авторизация</h2>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' }
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField id="outlined-basic" label="email" variant="outlined"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                    />
                    <TextField id="outlined-basic"
                        label="password"
                        variant="outlined"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChangePassword}
                    />
                </Box>
                <Box component="form">
                    <Button variant="contained" onClick={this.handleLogin}>Войти</Button>
                </Box>
            </div>
        );
    }
}

function mapStateToProps (state: React.ComponentState) {
    return {
        users: state.get('users')
    };
}

const newConnect = connect(mapStateToProps)(Login);

export default newConnect;
