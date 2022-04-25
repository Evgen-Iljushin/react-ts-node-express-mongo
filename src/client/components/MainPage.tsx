import * as React from 'react';
import axios from 'axios';
import AdminPage from '../components/admin';
import UserPage from '../components/user';

interface Props {
    userAuth: boolean,
    isAdmin: false
}

class MainPage extends React.Component<Props, React.ComponentState> {
    constructor (props) {
        super(props);

        this.state = {
            isAdmin: false,
            userAuth: false
        };
    }

    render () {
        return (
            <div>
                <p>
                    {(() => {
                        if (this.props.isAdmin) {
                            return (
                                <AdminPage />
                            );
                        } else if (this.props.userAuth) {
                            return (
                                <UserPage />
                            );
                        }
                    })()}
                </p>

            </div>
        );
    }
}

export default MainPage;
