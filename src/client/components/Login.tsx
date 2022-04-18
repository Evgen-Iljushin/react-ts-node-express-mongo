import * as React from 'react';
import * as CSS from 'csstype';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const styleComponent: CSS.Properties = {
    display: 'grid',
    textAlign: 'center'
};

export default class Login extends React.Component<any, any> {
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
                    <TextField id="outlined-basic" label="email" variant="outlined" />
                    <TextField id="outlined-basic"
                        label="password"
                        variant="outlined"
                        type="password"
                    />
                </Box>
                <Box component="form">
                    <Button variant="contained">Войти</Button>
                </Box>
            </div>
        );
    }
}
