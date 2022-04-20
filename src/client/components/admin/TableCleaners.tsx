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
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
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
    p: 4
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

function createData (name: string, calories: number, fat: number) {
    return { name, calories, fat };
}

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
            openDialog2: false
        };

        this.setState({
            emptyRows: this.state.page > 0 ? Math.max(0, (1 + this.state.page) * this.state.rowsPerPage - rows.length) : 0
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

    componentDidMount () {
        this.callBackendAPI();
    }

    callBackendAPI = () => {
        axios.post('/auth/checkUserAuth')
            .then(res => {
                const data = res.data;
                console.log(data.user.role);
                this.setState({
                    userAuth: true,
                    isAdmin: data.user.role === 'admin'
                });

                setTimeout(() => {
                    console.log(this.state);
                }, 0);
            })
            .catch(err => {
                console.log('err get data: ', err);
                this.setState({
                    userAuth: false,
                    isAdmin: false
                });

                console.log(this.state);
            });
    }

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
                                ? rows.slice(this.state.page * this.state.rowsPerPage,
                                    this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                                : rows
                            ).map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="right">
                                        {row.calories}
                                    </TableCell>
                                    <TableCell style={{ width: 160 }} align="right">
                                        {row.fat}
                                    </TableCell>
                                    <TableCell style={{ width: 50 }} align="right">
                                        <Button
                                            variant="contained"
                                            onClick={() => this.handleOpen(1, {})} >Редактировать</Button>
                                    </TableCell>
                                    <TableCell style={{ width: 50 }} align="right">
                                        <Button variant="contained" color="error" onClick={() => this.handleOpenDialog(1, {})}>Удалить</Button>
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
                                    count={rows.length}
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
                            <Button color="error" onClick={() => this.handleClose(2, {})}>Отменить</Button>
                            <Button autoFocus>
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
                        <Button onClick={() => this.handleCloseDialog(1, {})} autoFocus color="error">
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
