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

const styleComponent: CSS.Properties = {
    display: 'grid',
    textAlign: 'center'
};
export default class Registration extends React.Component<any, any> {
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
                    <TextField id="outlined-basic" label="email" variant="outlined" />
                    <TextField id="outlined-basic"
                        label="password"
                        variant="outlined"
                        type="password"
                    />
                </Box>
                <Box>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Тип пользователя</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="user"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="admin" control={<Radio />} label="Админ" />
                            <FormControlLabel value="user" control={<Radio />} label="Пользователь" />
                        </RadioGroup>
                    </FormControl>
                </Box>
                <Box component="form">
                    <Button variant="contained">Войти</Button>
                </Box>
            </div>
        );
    }
}
