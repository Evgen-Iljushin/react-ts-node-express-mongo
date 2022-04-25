import * as React from 'react';
import * as CSS from 'csstype';
import * as ReactRedux from 'react-redux';
import axios from 'axios';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const connect = ReactRedux.connect;

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

const InputFile = styled('input')({
    display: 'none'
});

class Services extends React.Component<any, any> {
    constructor (props) {
        super(props);

        this.state = {
            cleanersData: [],
            selectedIndex: 0,
            newServicesName: '',
            newServicesPrice: 0,
            newServicesDescription: '',
            newServiceImageList: [],
            deleteCleanerId: '',
            cleanerId: '',
            openModal1: false,
            openModal2: false,
            openDialog1: false,
            openDialog2: false,
            services: [],
            deleteServicesId: ''
        };
        this.changeDescriptionNewCleaner = this.changeDescriptionNewCleaner.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeNameNewCleaner = this.changeNameNewCleaner.bind(this);
    }

    componentDidMount () {
        this.getAllCleaners();
        this.getServices('');
    }

    getAllCleaners = () => {
        axios.post('/api/getAllCleaners')
            .then(res => {
                this.setState({
                    cleanersData: res.data
                });
            })
            .catch(err => {
                console.log('err fetAllCleaners: ', err);
            });
    }

    handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number
    ) => {
        this.setState({ selectedIndex: index });
        setTimeout(() => {
            this.getServices(this.state.selectedIndex);
        }, 0);
    };

    getServices = (cleanerId: string) => {
        this.setState({
            services: []
        });
        axios.post('/api/getServices', { cleanerId })
            .then(res => {
                this.setState({
                    services: res.data
                });
            })
            .catch(err => {
                console.log('err fetAllCleaners: ', err);
            });
    }

    handleOpen = (modalNumb: number, data: object) => {
        switch (modalNumb) {
        case 1:
            this.setState({ openModal1: true });
            break;
        case 2:
            this.setState({ openModal2: true });
            break;
        }
    }

    handleClose = (modalNumb: number, data: object) => {
        switch (modalNumb) {
        case 1:
            this.setState({ openModal1: false });
            break;
        case 2:
            this.setState({ openModal2: false });
            break;
        }
    }

    handleOpenDialog = (dialogNumb, data) => {
        switch (dialogNumb) {
        case 1:
            this.setState({ openDialog1: true });
            this.setState({
                deleteServicesId: data
            });
            break;
        case 2:
            this.setState({ openDialog2: true });
            break;
        }
    }

    handleCloseDialog = (dialogNumb, data) => {
        switch (dialogNumb) {
        case 1:
            this.setState({ openDialog1: false });
            break;
        case 2:
            this.setState({ openDialog2: false });
            break;
        }
    }

    changeNameNewCleaner = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newServicesName: e.target.value
        });
    }

    changeDescriptionNewCleaner = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newServicesDescription: e.target.value
        });
    }

    changePriceNewCleaner = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newServicesPrice: e.target.value
        });
    }

    changeImageList = (event) => {
        const newFilesList = [];
        for (const [key, value] of Object.entries(event.target.files)) {
            newFilesList.push(value);
        }
        this.setState({
            newServiceImageList: newFilesList
        });
    }

    deleteService = () => {
        const cleanersId = this.state.deleteServicesId;
        axios.delete('/api/deleteServices?id=' + cleanersId).then(res => {
            this.handleCloseDialog(1, {});
            this.getAllCleaners();
            this.getServices(this.state.selectedIndex);
        }).catch(err => {
            this.handleCloseDialog(1, {});
            console.log(err);
            alert('ошибка при удалении услуги');
        });
    }

    createService = (files) => {
        axios.post('/api/createService', {
            name: this.state.newServicesName,
            description: this.state.newServicesDescription,
            price: this.state.newServicesPrice,
            cleanerId: this.state.selectedIndex,
            files: files
        }).then(res => {

            this.setState({
                newServicesName: '',
                newServicesDescription: '',
                newServicesPrice: 0,
                newServiceImageList: []
            });

            setTimeout(() => {
                this.handleClose(2, {});
                this.getAllCleaners();
                this.getServices(this.state.selectedIndex);
            });
        }).catch(err => {
            console.log(err);
            alert('ошибка при добавлении химчистки');
        });
    }

    saveService = async () => {
        if (this.state.newServicesName !== '' &&
            this.state.newServicesDescription !== '' &&
            this.state.newServicesPrice !== 0) {
            if (this.state.selectedIndex === 0) return alert('Выберите химчистку');
            const formData = new FormData();
            if (this.state.newServiceImageList.length > 0) {
                this.state.newServiceImageList.forEach(file => {
                    formData.append('images', file);
                });
            }
            await axios.post('/api/uploadFiles', formData).then(res => {
                return this.createService(res.data);
            }).catch(err => {
                console.log(err);
                alert('ошибка при загрузки файлов');
            });
        } else alert('Данные не заполнены');
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newServicesPrice: event.target.value
        });
    };

    render () {
        return (
            <div style={{ display: 'flex' }}>
                <Box
                    sx={{ width: '30%', height: 400, minWidth: 360, bgcolor: 'background.paper', float: 'left' }}
                >
                    <h4>Химчистки</h4>
                    <List component="nav" aria-label="secondary mailbox folder">
                        <ListItemButton
                            selected={this.state.selectedIndex === 0}
                            onClick={(event) => this.handleListItemClick(event, 0)}
                        >
                            <ListItemText primary={'Все химчистки'} />
                        </ListItemButton>
                        <Divider />
                        {
                            (this.state.cleanersData).map((cleaner) => (
                                <ListItemButton
                                    selected={this.state.selectedIndex === cleaner._id}
                                    onClick={(event) => this.handleListItemClick(event, cleaner._id)}
                                >
                                    <ListItemText primary={cleaner.name} />
                                </ListItemButton>
                            ))
                        }
                    </List>
                </Box>
                <Box
                    sx={{ width: '68%', bgcolor: 'background.paper' }}
                >
                    <h4>Услуги</h4>
                    <Box>
                        <Button variant="contained" onClick={() => this.handleOpen(2, {})} >Добавить услугу</Button>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="right">Название</TableCell>
                                        <TableCell align="right">Цена</TableCell>
                                        <TableCell align="right">Описание</TableCell>
                                        <TableCell align="right">Действие</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.services.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.price}</TableCell>
                                            <TableCell align="right">{row.description}</TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" color="error" onClick={() => this.handleOpenDialog(1, row._id)}>Удалить</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Box>
                <Modal
                    open={this.state.openModal2}
                    key="modal2"
                    onClose={() => this.handleClose(2, {})}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div>
                        <Box sx={style}>
                            <h2>Новая химчистка</h2>
                            <div>
                                <div>
                                    <TextField id="standard-basic" label="Название" variant="standard"
                                        value={this.state.newServicesName}
                                        onChange={this.changeNameNewCleaner}
                                    />
                                </div><br />
                                <FormControl variant="standard">
                                    <InputLabel htmlFor="component-simple">Цена</InputLabel>
                                    <Input id="component-simple" type="number"
                                        value={this.state.newServicesPrice}
                                        onChange={this.handleChange} />
                                </FormControl>
                                <p>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Описание"
                                        multiline
                                        rows={3}
                                        defaultValue=""
                                        value={this.state.newServicesDescription}
                                        onChange={this.changeDescriptionNewCleaner}
                                    />
                                </p>
                                <label htmlFor="contained-button-file">
                                    <InputFile accept="image/*" id="contained-button-file" multiple type="file"
                                        onChange={this.changeImageList}
                                    />
                                    <p>{ this.state.newServiceImageList.length > 0
                                        ? this.state.newServiceImageList.map(el => el.name).join(', ')
                                        : 'Файлы не выбраны'
                                    }</p>
                                    <Button variant="contained" component="span">
                                        Загрузить фото
                                    </Button>
                                </label>
                            </div><br />
                            <Button color="error" onClick={() => this.handleClose(2, {})}>Отменить</Button>
                            <Button autoFocus onClick={this.saveService}>
                                Сохранить
                            </Button>
                        </Box>
                    </div>
                </Modal>
                <Dialog
                    open={this.state.openDialog1}
                    onClose={() => this.handleCloseDialog(1, {})}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {'Удалить химчистку?'}
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={() => this.handleCloseDialog(1, {})}>Отменить</Button>
                        <Button onClick={this.deleteService} autoFocus color="error">
                            Удалить
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

function mapStateToProps (state: React.ComponentState) {
    return {
        users: state.get('users')
    };
}

const newConnect = connect(mapStateToProps)(Services);

export default newConnect;
