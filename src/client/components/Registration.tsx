import * as React from 'react';
import * as CSS from 'csstype';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AuthService from '../services/auth.services';
import { registrationUser } from '../store/actions';
import * as ReactRedux from 'react-redux';

const connect = ReactRedux.connect;

interface Props {
    dispatch: any
    history?: any
}

const styleComponent: CSS.Properties = {
    display: 'grid',
    textAlign: 'center'
};
class Registration extends React.Component<Props, any> {
    constructor (props) {
        super(props);
        this.handleRegistration = this.handleRegistration.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRole = this.onChangeRole.bind(this);

        this.state = {
            email: '',
            password: '',
            role: ''
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

    onChangeRole (e) {
        this.setState({
            role: e.target.value
        });
    }

    async handleRegistration (e) {
        const { dispatch } = this.props;

        try {
            e.preventDefault();
            this.setState({
                loading: true
            });

            const loginData = await AuthService.register(
                this.state.email,
                this.state.password,
                this.state.role
            );
            if (loginData.data.user) {
                dispatch(registrationUser(loginData.data.user, dispatch));
                document.location.replace('/');
            }
        } catch (e) {
            alert('Ошибка регистрации');
            console.log('err: ', e);
            dispatch({
                type: 'SET_MESSAGE',
                message: 'Error user registered'
            });
        }
    }

    render () {
        return (
            <div style={styleComponent}>
                <h2>Регистрация</h2>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' }
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-basic"
                        label="email"
                        variant="outlined"
                        autoComplete="off"
                        onChange={this.onChangeEmail}
                    />
                    <TextField id="outlined-basic"
                        label="password"
                        variant="outlined"
                        type="password"
                        autoComplete="off"
                        onChange={this.onChangePassword}
                    />
                </Box>
                <Box>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Тип пользователя</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="Пользователь"
                            name="radio-buttons-group"
                            value={this.state.role}
                            onChange={this.onChangeRole}
                        >
                            <FormControlLabel value="admin" control={<Radio />} label="Админ" />
                            <FormControlLabel value="user" control={<Radio />} label="Пользователь" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box component="form" onClick={this.handleRegistration}>
                    <Button variant="contained">Войти</Button>
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

const newConnect = connect(mapStateToProps)(Registration);

export default newConnect;
