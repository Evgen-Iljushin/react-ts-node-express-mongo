import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Provider } from 'react-redux';
import MainPage from './components/MainPage';
import Nav from './components/Nav';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Registration from './components/Registration';
import store from './store/store';
import axios from "axios";
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
            userAuth: false
        };
    }

    componentDidMount () {
        this.callBackendAPI();
    }

    callBackendAPI = () => {
        axios.post('/auth/checkUserAuth')
            .then(res => {
                const data = res.data;
                console.log(data.user.role);
                this.setState({
                    userAuth: true,
                    isAdmin: data.user.role === 'admin'
                });

                setTimeout(() => {
                    console.log(this.state);
                }, 0);
            })
            .catch(err => {
                console.log('err get data: ', err);
                this.setState({
                    userAuth: false,
                    isAdmin: false
                });

                console.log(this.state);
            });
    }

    render () {
        return (
            <Provider store={storeCnt}>
                <Router>
                    <div>
                        <Nav userAuth={this.state.userAuth}/>
                        <Routes>
                            <Route path="/" element={<MainPage userAuth={this.state.userAuth} isAdmin={this.state.isAdmin}/>} />
                            <Route path="/login" element={<Login/>} />
                            <Route path="/registration" element={<Registration />} />
                            <Route path="*" element={<NotFound />}/>
                        </Routes>
                    </div>
                </Router>
            </Provider>

        );
    }
}
