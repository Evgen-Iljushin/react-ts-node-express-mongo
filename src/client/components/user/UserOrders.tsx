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

interface Params {
    name: string;
    id: string;
    urlParams?: object;
}

type Props = WithRouterProps<Params>;

class Cleaner extends React.Component<Props, any> {
    constructor (props: Props) {
        super(props);

        this.state = {
            userOrders: []
        };
    }

    componentDidMount () {
        this.callBackendAPI();
    }

    callBackendAPI = () => {
        axios.post('/user/getUserOrder')
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

    render () {
        return (
            <div>
                <h2>Ваши заказы</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Название услуги</TableCell>
                                <TableCell>Цена</TableCell>
                                <TableCell>Статус</TableCell>
                                <TableCell >Дата создания</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.userOrders.map((order) => (
                                <TableRow
                                    key={order._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {order.serviceName}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {order.priceService}
                                    </TableCell>
                                    <TableCell>{order.status === 'Новый' ? 'В обработке' : order.status}</TableCell>
                                    <TableCell>{order.createdAt.split('T')[0]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default withRouter(Cleaner, ['name']);
