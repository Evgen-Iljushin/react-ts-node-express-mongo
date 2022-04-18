import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

import MainPage from './components/MainPage';
import Nav from './components/Nav';
import NotFound from './components/NotFound';
import Login from './components/Login';
import Registration from './components/Registration';

const Router = ReactRouterDOM.BrowserRouter;
const Routes = ReactRouterDOM.Routes;
const Route = ReactRouterDOM.Route;

export default class App extends React.Component<React.ComponentProps<any>, React.ComponentState> {
    render () {
        return (
            <Router>
                <div>
                    <Nav />
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/registration" element={<Registration />} />
                        <Route path="*" element={<NotFound />}/>
                    </Routes>
                </div>
            </Router>
        );
    }
}
