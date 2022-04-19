import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { Provider } from 'react-redux';
import MainPage from './components/MainPage';
import Nav from './components/Nav';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Registration from './components/Registration';
import store from './store/store';
// import history from './helpers/history';

const Router = ReactRouterDOM.BrowserRouter;
const Routes = ReactRouterDOM.Routes;
const Route = ReactRouterDOM.Route;

const storeCnt = store();

export default class App extends React.Component<React.ComponentProps<any>, React.ComponentState> {
    constructor (props) {
        super(props);
        /*
        history.listen((location) => {
            props.dispatch(clearMessage);
        });
         */
    }

    render () {
        return (
            <Provider store={storeCnt}>
                <Router>
                    <div>
                        <Nav />
                        <Routes>
                            <Route path="/" element={<MainPage />} />
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
