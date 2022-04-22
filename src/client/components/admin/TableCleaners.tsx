import * as React from 'react';
import * as CSS from 'csstype';
import * as ReactRedux from 'react-redux';
import axios from 'axios';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTheme, styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';

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

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

function TablePaginationActions (props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

function createData (name: string, description: string, date: Date) {
    return { name, description, date };
}

/*
const rows = [
    createData('Cupcake', 305, 3.7),
    createData('Donut', 452, 25.0),
    createData('Eclair', 262, 16.0),
    createData('Frozen yoghurt', 159, 6.0),
    createData('Gingerbread', 356, 16.0),
    createData('Honeycomb', 408, 3.2),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Jelly Bean', 375, 0.0),
    createData('KitKat', 518, 26.0),
    createData('Lollipop', 392, 0.2),
    createData('Marshmallow', 318, 0),
    createData('Nougat', 360, 19.0),
    createData('Oreo', 437, 18.0)
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

 */

const Input = styled('input')({
    display: 'none'
});

class TableCleaners extends React.Component<TablePaginationActionsProps, any> {
    constructor (props) {
        super(props);

        this.state = {
            page: 0,
            rowsPerPage: 5,
            emptyRows: '',
            openModal1: false,
            openModal2: false,
            openDialog1: false,
            openDialog2: false,
            newDryCleanerName: '',
            newDryCleanerDescription: '',
            newDryCleanerImageList: [],
            tableRows: [],
            deleteCleanerId: ''
        };

        this.changeNameNewCleaner = this.changeNameNewCleaner.bind(this);
        this.changeDescriptionNewCleaner = this.changeDescriptionNewCleaner.bind(this);
        this.setState({
            emptyRows: this.state.page > 0 ? Math.max(0, (1 + this.state.page) * this.state.rowsPerPage - this.state.tableRows.length) : 0
        });
    }

    componentDidMount () {
        this.getAllCleaners();
    }

    getAllCleaners = () => {
        axios.post('/api/getAllCleaners')
            .then(res => {
                const data = res.data;
                this.setState({
                    tableRows: res.data
                });

                setTimeout(() => {
                    this.setState({
                        emptyRows: this.state.page > 0 ? Math.max(0, (1 + this.state.page) * this.state.rowsPerPage - this.state.tableRows.length) : 0
                    });
                }, 0);
            })
            .catch(err => {
                console.log('err fetAllCleaners: ', err);
            });
    }

    changeNameNewCleaner = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newDryCleanerName: e.target.value
        });
    }

    changeDescriptionNewCleaner = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            newDryCleanerDescription: e.target.value
        });
    }

    changeImageList = (event) => {
        const newFilesList = [];
        for (const [key, value] of Object.entries(event.target.files)) {
            newFilesList.push(value);
        }
        this.setState({
            newDryCleanerImageList: newFilesList
        });
    }

    deleteCleaners = () => {
        const cleanersId = this.state.deleteCleanerId;
        axios.delete('/api/deleteCleaners?id=' + cleanersId).then(res => {
            this.handleCloseDialog(1, {});
            this.getAllCleaners();
        }).catch(err => {
            this.handleCloseDialog(1, {});
            console.log(err);
            alert('ошибка при удалении химчистки');
        });
    }

    createDryCleaner = (files) => {
        axios.post('/api/createDryCleaner', {
            name: this.state.newDryCleanerName,
            description: this.state.newDryCleanerDescription,
            files: files
        }).then(res => {
            this.setState({
                newDryCleanerName: '',
                newDryCleanerDescription: '',
                newDryCleanerImageList: []
            });

            this.handleClose(2, {});
            this.getAllCleaners();
        }).catch(err => {
            console.log(err);
            alert('ошибка при добавлении химчистки');
        });
    }

    saveNewCategory = async () => {
        if (this.state.newDryCleanerName !== '' && this.state.newDryCleanerDescription !== '') {
            const formData = new FormData();
            if (this.state.newDryCleanerImageList.length > 0) {
                this.state.newDryCleanerImageList.forEach(file => {
                    formData.append('images', file);
                });
            }
            await axios.post('/api/uploadFiles', formData, {
            }).then(res => {
                return this.createDryCleaner(res.data);
            }).catch(err => {
                console.log(err);
                alert('ошибка при загрузки файлов');
            });
        } else alert('Данные не заполнены');
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
                deleteCleanerId: data
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

    handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        this.setState({ page: newPage });
    };

    handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
        this.setState({ page: 0 });
    };

    render () {
        return (
            <div>
                <Box>
                    <Button variant="contained" onClick={() => this.handleOpen(2, {})} >Добавить</Button>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                        <TableBody>
                            {(this.state.rowsPerPage > 0
                                ? this.state.tableRows.slice(this.state.page * this.state.rowsPerPage,
                                    this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                : this.state.tableRows
                            ).map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.description}
                                    </TableCell>
                                    <TableCell style={{ width: 260 }} align="right">
                                        {row.createdAt}
                                    </TableCell>
                                    {/* <TableCell style={{ width: 50 }} align="right">
                                        <Button
                                            variant="contained"
                                            onClick={() => this.handleOpen(1, {})} >Редактировать</Button>
                                    </TableCell> */}
                                    <TableCell style={{ width: 50 }} align="right">
                                        <Button variant="contained" color="error" onClick={() => this.handleOpenDialog(1, row._id)}>Удалить</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {this.state.emptyRows > 0 && (
                                <TableRow style={{ height: 53 * this.state.emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={3}
                                    count={this.state.tableRows.length}
                                    rowsPerPage={this.state.rowsPerPage}
                                    page={this.state.page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'rows per page'
                                        },
                                        native: true
                                    }}
                                    onPageChange={this.handleChangePage}
                                    onRowsPerPageChange={this.handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
                <Modal
                    open={this.state.openModal1}
                    key="modal1"
                    onClose={() => this.handleClose(1, {})}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>

                    </Box>
                </Modal>
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
                                        value={this.state.nameNewCleaner}
                                        onChange={this.changeNameNewCleaner}
                                    />
                                </div>
                                <p>
                                    <TextField
                                        id="outlined-multiline-static"
                                        label="Описание"
                                        multiline
                                        rows={3}
                                        defaultValue=""
                                        value={this.state.descriptionNewCleaner}
                                        onChange={this.changeDescriptionNewCleaner}
                                    />
                                </p>
                                <label htmlFor="contained-button-file">
                                    <Input accept="image/*" id="contained-button-file" multiple type="file"
                                        onChange={this.changeImageList}
                                    />
                                    <p>{ this.state.newDryCleanerImageList.length > 0
                                        ? this.state.newDryCleanerImageList.map(el => el.name).join(', ')
                                        : 'Файлы не выбраны'
                                    }</p>
                                    <Button variant="contained" component="span">
                                        Загрузить фото
                                    </Button>
                                </label>
                            </div><br />
                            <Button color="error" onClick={() => this.handleClose(2, {})}>Отменить</Button>
                            <Button autoFocus onClick={this.saveNewCategory}>
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
                        <Button onClick={this.deleteCleaners} autoFocus color="error">
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

const newConnect = connect(mapStateToProps)(TableCleaners);

export default newConnect;
