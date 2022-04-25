import * as React from 'react';
import * as CSS from 'csstype';
import * as ReactRedux from 'react-redux';
import * as ReactRouterDOM from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const NavLink = ReactRouterDOM.NavLink;
const connect = ReactRedux.connect;

// @ts-ignore
const styleCleaner = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr',
    gridGap: '10px'
};

const styleImage = {
    display: 'inline-grid',
    maxWidth: '100%',
    width: 'auto',
    maxHeight: '150px',
    minHeight: '150px'
};

interface Props {
    dispatch: any
    history?: any
}

class Registration extends React.Component<Props, any> {
    constructor (props) {
        super(props);
        // this.handleRegistration = this.handleRegistration.bind(this);

        this.state = {
            value: 0,
            cleanersList: []
        };
    }

    componentDidMount () {
        this.callBackendAPI();
    }

    callBackendAPI = () => {
        axios.post('/api/getAllCleaners')
            .then(res => {
                const data = res.data;
                if (data.length > 0) {
                    this.setState({
                        cleanersList: data
                    });
                }
            })
            .catch(err => {
                console.log('err get all cleaners: ', err);
                this.setState({
                    cleanersList: []
                });
            });
    }

    render () {
        return (
            <div>
                <h2>Химчистки</h2>
                <div style={styleCleaner}>
                    {
                        (this.state.cleanersList).map((cleaner) => (
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        { cleaner.name }
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        { cleaner.description }
                                    </Typography>
                                    <Typography variant="h5" component="div">
                                        <img src={
                                            cleaner.gallery.length > 0
                                                ? '/' + cleaner.gallery[0].replace(/\\/g, '/')
                                                : ''}
                                        style={styleImage} />
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <NavLink to={`/cleaners/${cleaner._id}?name=${cleaner.name}` }>
                                        <Button size="small">Выбрать</Button>
                                    </NavLink>
                                </CardActions>
                            </Card>
                        ))
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps (state: React.ComponentState) {
    return {
        users: state.get('users')
    };
}

const newConnect = connect(mapStateToProps)(Registration);

export default newConnect;
