import * as React from 'react';
import * as CSS from 'csstype';
import * as ReactRedux from 'react-redux';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { loginUser } from '../store/actions';
import AuthService from '../services/auth.services';
import axios from "axios";

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
        this.onChangeRestoreEmail = this.onChangeRestoreEmail.bind(this);
        this.onChangeNewPassword = this.onChangeNewPassword.bind(this);
        this.restorePassword = this.restorePassword.bind(this);

        this.state = {
            email: '',
            password: '',
            newPassword: '',
            restoreEmail: ''
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

    onChangeRestoreEmail (e) {
        this.setState({
            restoreEmail: e.target.value
        });
    }

    onChangeNewPassword (e) {
        this.setState({
            newPassword: e.target.value
        });
    }

    async handleLogin (e) {
        try {
            e.preventDefault();
            this.setState({
                loading: true
            });

            const { dispatch } = this.props;
            const loginData = await AuthService.login(this.state.email, this.state.password);
            dispatch(loginUser(loginData.user, dispatch));
            document.location.replace('/');
        } catch (e) {
            alert('Ошибка авторизации');
        }
    }

    async restorePassword (e) {
        try {
            e.preventDefault();
            this.setState({
                loading: true
            });

            await AuthService.restore(this.state.restoreEmail, this.state.newPassword);
            alert('Пароль восстановлен');
        } catch (e) {
            alert('Ошибка восстановления пароля');
        }
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
                <br />
                <Box style={{ display: 'flex', justifyContent: 'center' }}>
                    <Accordion style={{ maxWidth: '400px' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Восстановить пароль</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '25ch' }
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <TextField id="outlined-basic" label="email" variant="outlined"
                                        value={this.state.restoreEmail}
                                        onChange={this.onChangeRestoreEmail}
                                    />
                                    <TextField id="outlined-basic"
                                        label="password"
                                        variant="outlined"
                                        type="password"
                                        value={this.state.newPassword}
                                        onChange={this.onChangeNewPassword}
                                    />
                                </Box>
                                <Box component="form">
                                    <Button variant="contained" onClick={this.restorePassword}>Восстановить</Button>
                                </Box>
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
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
