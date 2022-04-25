import * as React from 'react';
import axios from 'axios';
import { withRouter, WithRouterProps } from '../../lib/withRouter';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';

import MenuItem from '@mui/material/MenuItem';

import Select, { SelectChangeEvent } from '@mui/material/Select';

interface Params {
    name: string;
    id: string;
    urlParams?: object;
}

type Props = WithRouterProps<Params>;

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
            userOrders: [],
            openModal: false,
            orderId: '',
            serviceName: '',
            priceService: 0,
            userName: '',
            status: 'Новый',
            allStatus: [
                'Новый',
                'Готов к выдаче',
                'Выполнен',
                'Возврат'
            ]
        };
    }

    componentDidMount () {
        this.callBackendAPI();
    }

    callBackendAPI = () => {
        axios.post('/api/getOrders')
            .then(res => {
                const data = res.data;
                if (data.length > 0) {
                    this.setState({
                        userOrders: data
                    });
                }
            })
            .catch(err => {
                console.log('err get getUserOrder: ', err);
                this.setState({
                    serviceList: []
                });
            });
    }

    editOrder = (order: object) => {
        this.handleOpen(order);
    }

    handleClose = () => {
        this.setState({ openModal: false });
    }

    handleOpen = (order) => {
        console.log('edited order: ', order);
        this.setState({
            openModal: true,
            orderId: order._id,
            serviceName: order.serviceName,
            priceService: order.priceService,
            userName: order.userName,
            status: order.status
        });
    }

    changeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            userName: e.target.value
        });
    }

    changeServiceName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            serviceName: e.target.value
        });
    }

    changePriceService = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            priceService: e.target.value
        });
    }

    changeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.target.value
        });
    }

    updateOrder = () => {
        axios.post('/api/updateOrders', {
            orderId: this.state.orderId,
            serviceName: this.state.serviceName,
            priceService: this.state.priceService,
            serviceId: this.state.serviceId,
            userName: this.state.userName,
            status: this.state.status
        })
            .then(res => {
                this.callBackendAPI();
                this.handleClose();
            })
            .catch(err => {
                console.log('err update order: ', err);
            });
    }

    render () {
        return (
            <div>
                <h2>Заказы</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Имя пользователя</TableCell>
                                <TableCell>Название услуги</TableCell>
                                <TableCell>Цена</TableCell>
                                <TableCell>Статус</TableCell>
                                <TableCell >Дата создания</TableCell>
                                <TableCell ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.userOrders.map((order) => (
                                <TableRow
                                    key={order._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {order.userName}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {order.serviceName}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {order.priceService}
                                    </TableCell>
                                    <TableCell>{order.status}</TableCell>
                                    <TableCell>{order.createdAt.split('T')[0]}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => this.editOrder(order)} size="small" >
                                            Редактировать
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Modal
                    open={this.state.openModal}
                    key="modal2"
                    onClose={() => this.handleClose()}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div>
                        <Box sx={style}>
                            <h2>Редактирование заказа</h2>
                            <div>
                                <div>
                                    <TextField id="standard-basic" label="ФИО" variant="standard"
                                        value={this.state.userName}
                                        onChange={this.changeUserName}
                                    />
                                </div><br />
                                <div>
                                    <TextField id="standard-basic" label="Название услуги" variant="standard"
                                        value={this.state.serviceName}
                                        onChange={this.changeServiceName}
                                    />
                                </div><br />
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Цена</InputLabel>
                                    <Input id="component-simple" type="number"
                                        value={this.state.priceService}
                                        onChange={this.changePriceService} />
                                </FormControl>
                            </div><br />
                            <div>
                                <FormControl style={{ width: '200px' }}>
                                    <InputLabel id="demo-simple-select-label">Статус</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.status}
                                        label="Age"
                                        onChange={this.changeStatus}
                                    >
                                        {this.state.allStatus.map(el => (
                                            <MenuItem value={el}>{el}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div><br />
                            <Button color="error" onClick={() => this.handleClose()}>Отменить</Button>
                            <Button autoFocus onClick={this.updateOrder}>
                                Сохранить изменения
                            </Button>
                        </Box>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default withRouter(Cleaner, ['name']);
