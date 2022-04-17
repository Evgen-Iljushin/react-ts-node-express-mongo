import * as React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

const Router = ReactRouterDOM.BrowserRouter;

class App extends React.Component<React.ComponentProps<any>, React.ComponentState>{
    render () {
        return (
            <Router>
            </Router>
        );
    }
}

export default App;