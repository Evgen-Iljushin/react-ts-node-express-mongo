import * as React from 'react';
import axios from 'axios';
import * as ReactRouterDOM from 'react-router-dom';
import { withRouter, WithRouterProps } from '../../lib/withRouter';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const NavLink = ReactRouterDOM.NavLink;

interface Params {
    name: string;
    id: string;
    urlParams?: object;
}

type Props = WithRouterProps<Params>;

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

class Cleaner extends React.Component<Props, any> {
    constructor (props: Props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            serviceList: []
        };
    }

    componentDidMount () {
        this.callBackendAPI();
    }

    callBackendAPI = () => {
        axios.post('/api/getServices', { cleanerId: this.state.id })
            .then(res => {
                const data = res.data;
                if (data.length > 0) {
                    this.setState({
                        serviceList: data
                    });
                }
            })
            .catch(err => {
                console.log('err get services: ', err);
                this.setState({
                    serviceList: []
                });
            });
    }

    render () {
        return (
            <div>
                <h2>Химчистка {this.props.match.urlParams.name}. Список услуг: </h2>
                <div style={styleCleaner}>
                    {
                        (this.state.serviceList).map((cleaner) => (
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        { cleaner.name }
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Цена: <b>{ cleaner.price }</b>
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
                                    <Button size="small">Заказать</Button>
                                </CardActions>
                            </Card>
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(Cleaner, ['name']);
