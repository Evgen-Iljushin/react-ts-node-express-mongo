import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AuthService from '../services/auth.services';
import store from '../store/store';
const NavLink = ReactRouterDOM.NavLink;

const pages = [
    { title: 'Главная', url: '/' },
    { title: 'Логин', url: '/login' },
    { title: 'Регистрация', url: '/registration' }
];
const settings = ['Выйти из аккаунта'];

type typeisActive = {
    isActive: boolean
    isAdmin: boolean
}

const setActive = ({ isActive }: typeisActive) => (isActive ? 'active' : '');

interface State {
    auth: boolean
    anchorElNav: null | HTMLElement
    anchorElUser: null | HTMLElement
    balance: number
}

interface Props {
    userAuth: boolean
    isAdmin: boolean
    balance: number
}

export default class Nav extends React.Component<Props, State> {
    constructor (props) {
        super(props);

        this.state = {
            auth: false,
            anchorElNav: null,
            anchorElUser: null,
            balance: 100
        };

        this.logoutUser = this.logoutUser.bind(this);
    }

    handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ anchorElNav: event.currentTarget });
    };

    handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ anchorElUser: event.currentTarget });
    };

    handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ anchorElNav: null });
    };

    handleCloseUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({ anchorElUser: null });
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ auth: event.target.checked });
    };

    logoutUser = (e) => {
        this.setState({ anchorElUser: null });
        AuthService.logout();
        document.location.replace('/');
    };

    render () {
        return (
            <div>
                <AppBar position="static">
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                            >
                                Система управления заказами
                            </Typography>

                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={this.handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={this.state.anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left'
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left'
                                    }}
                                    open={Boolean(this.state.anchorElNav)}
                                    onClose={this.handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' }
                                    }}
                                >
                                    <nav className="dropdown">
                                        {pages.map((page) => (
                                            <NavLink to={page.url} className={setActive} key={page.title}>
                                                <MenuItem onClick={this.handleCloseNavMenu}>
                                                    <Typography textAlign="center"
                                                        style={{ color: 'black' }}
                                                    >{page.title}</Typography>
                                                </MenuItem>
                                            </NavLink>
                                        ))}
                                        { (this.props.isAdmin)
                                            ? <NavLink to='orders' className={setActive} key='userOrders'>
                                                <MenuItem onClick={this.handleCloseNavMenu}>
                                                    <Typography textAlign="center"
                                                        style={{ color: 'black' }}
                                                    >Мои заказы</Typography>
                                                </MenuItem>
                                            </NavLink>
                                            : ''
                                        }
                                    </nav>
                                </Menu>
                            </Box>
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                            >
                                Система управления заказами
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                <nav>
                                    {pages.map((page) => (
                                        <NavLink to={page.url}
                                            className={setActive}
                                            key={page.title}
                                            style={{ float: 'left' }}
                                        >
                                            <Button
                                                onClick={this.handleCloseNavMenu}
                                                sx={{ my: 2, color: 'white', display: 'block' }}
                                            >
                                                {page.title}
                                            </Button>
                                        </NavLink>
                                    ))}

                                    { (!this.props.isAdmin && this.props.userAuth)
                                        ? <NavLink to='orders'
                                            className={setActive}
                                            key='userOrders'
                                            style={{ float: 'left' }}
                                        >
                                            <Button
                                                onClick={this.handleCloseNavMenu}
                                                sx={{ my: 2, color: 'white', display: 'block' }}
                                            >
                                                Мои заказы
                                            </Button>
                                        </NavLink>
                                        : ''
                                    }
                                </nav>
                            </Box>

                            {(() => {
                                if (this.props.userAuth) {
                                    return (
                                        <div>
                                            <Box sx={{ flexGrow: 0 }}>
                                                <Tooltip title="Open settings">
                                                    <IconButton onClick={this.handleOpenUserMenu} sx={{ p: 0 }}>
                                                        <Avatar alt="Avatar" src="/static/images/avatar/2.jpg" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Menu
                                                    sx={{ mt: '45px' }}
                                                    id="menu-appbar"
                                                    anchorEl={this.state.anchorElUser}
                                                    anchorOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right'
                                                    }}
                                                    keepMounted
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right'
                                                    }}
                                                    open={Boolean(this.state.anchorElUser)}
                                                    onClose={this.handleCloseUserMenu}
                                                >
                                                    {settings.map((setting) => (
                                                        <MenuItem key={setting} onClick={this.logoutUser}>
                                                            <Typography textAlign="center">{setting}</Typography>
                                                        </MenuItem>
                                                    ))}
                                                </Menu>
                                            </Box>
                                            { (!this.props.isAdmin && this.props.userAuth)
                                                ? <Button
                                                    onClick={this.handleCloseNavMenu}
                                                    style={{
                                                        position: 'absolute',
                                                        right: '10%',
                                                        top: '7px'
                                                    }}
                                                    sx={{ my: 2, color: 'white', display: 'block', float: 'right' }}
                                                >
                                                    Баланс: {this.props.balance}
                                                </Button>
                                                : ''
                                            }
                                        </div>
                                    );
                                }
                            })()}
                        </Toolbar>
                    </Container>
                </AppBar>
            </div>
        );
    }
}
