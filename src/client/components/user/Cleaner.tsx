import * as React from 'react';
import axios from 'axios';
import * as ReactRouterDOM from 'react-router-dom';
import { withRouter, WithRouterProps } from '../../lib/withRouter';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';

interface Params {
    name: string;
    id: string;
    urlParams?: object;
    balance: number;
    changeBalance: (newBalance: number) => void;
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

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
};

class Cleaner extends React.Component<Props, any> {
    constructor (props: Props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            serviceList: [],
            openModal: false,
            userName: '',
            serviceId: '',
            serviceName: '',
            priceService: 0
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

    handleClose = () => {
        this.setState({ openModal: false });
    }

    handleOpen = (cleaner: { name: string, _id: string, price: number }) => {
        if (cleaner.price < this.props.balance) {
            this.setState({
                serviceName: cleaner.name,
                serviceId: cleaner._id,
                openModal: true,
                priceService: cleaner.price
            });
        } else alert('Недостаточно средств на балансе');
    }

    orderService = () => {
        if (this.state.userName !== '') {
            axios.post('/user/createOrder', {
                serviceName: this.state.serviceName,
                priceService: this.state.priceService,
                serviceId: this.state.serviceId,
                userName: this.state.userName
            })
                .then(res => {
                    this.props.changeBalance(this.props.balance - this.state.priceService);
                    alert('Заказ оформлен');
                    this.handleClose()
                })
                .catch(err => {
                    console.log('err create order: ', err);
                    this.setState({
                        serviceList: []
                    });
                });
        } else alert('Укажите ваше имя');
    }

    changeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            userName: e.target.value
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
                                    <Button size="small" onClick={() => this.handleOpen(cleaner)}>Заказать</Button>
                                </CardActions>
                            </Card>
                        ))
                    }
                </div>
                <Modal
                    open={this.state.openModal}
                    key="modal2"
                    onClose={() => this.handleClose()}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div>
                        <Box sx={style}>
                            <h2>Новая заказ</h2>
                            <div>
                                <div>
                                    <TextField id="standard-basic" label="ФИО" variant="standard"
                                        value={this.state.userName}
                                        onChange={this.changeUserName}
                                    />
                                </div><br />
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Цена</InputLabel>
                                </FormControl>
                            </div><br />
                            <Button color="error" onClick={() => this.handleClose()}>Отменить</Button>
                            <Button autoFocus onClick={this.orderService}>
                                Подтвердить заказ
                            </Button>
                        </Box>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default withRouter(Cleaner, ['name']);
