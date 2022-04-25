import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Provider } from 'react-redux';
import MainPage from './components/MainPage';
import Nav from './components/Nav';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Registration from './components/Registration';
import Cleaner from './components/user/Cleaner';
import UserOrders from './components/user/UserOrders';
import store from './store/store';
import axios from 'axios';
// import history from './helpers/history';

const Router = ReactRouterDOM.BrowserRouter;
const Routes = ReactRouterDOM.Routes;
const Route = ReactRouterDOM.Route;

const storeCnt = store();

export default class App extends React.Component<React.ComponentProps<any>, React.ComponentState> {
    constructor (props) {
        super(props);

        this.state = {
            isAdmin: false,
            userAuth: false,
            balance: 100
        };
    }

    componentDidMount () {
        this.callBackendAPI();
    }

    callBackendAPI = () => {
        axios.post('/auth/checkUserAuth')
            .then(res => {
                const data = res.data;
                this.setState({
                    userAuth: true,
                    isAdmin: data.user.role === 'admin'
                });

                if (!(data.user.role === 'admin')) {
                    this.setState({
                        balance: Math.floor(Math.random() * (300 - 150 + 1)) + 150
                    });
                }
            })
            .catch(err => {
                console.log('err get data: ', err);
                this.setState({
                    userAuth: false,
                    isAdmin: false
                });
            });
    }

    changeBalance = (newBalance) => {
        this.setState({
            balance: newBalance
        });
    }

    render () {
        return (
            <Provider store={storeCnt}>
                <Router>
                    <div>
                        <Nav userAuth={this.state.userAuth} isAdmin={this.state.isAdmin} balance={this.state.balance}/>
                        <Routes>
                            <Route path="/" element={<MainPage userAuth={this.state.userAuth} isAdmin={this.state.isAdmin}/>} />
                            <Route path="/cleaners/:id" element={<Cleaner
                                // @ts-ignore
                                balance={this.state.balance as string}
                                changeBalance={this.changeBalance} />}/>
                            <Route path="/login" element={<Login/>} />
                            <Route path="/registration" element={<Registration />} />
                            <Route path="/orders" element={<UserOrders />} />
                            <Route path="*" element={<NotFound />}/>
                        </Routes>
                    </div>
                </Router>
            </Provider>

        );
    }
}
