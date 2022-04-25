import * as React from 'react';
import * as CSS from 'csstype';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as ReactRedux from 'react-redux';
import axios from 'axios';
import TableCleaners from './TableCleaners';
import Services from './Services';
import Orders from './Orders';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel (props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps (index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const connect = ReactRedux.connect;

interface Props {
    dispatch: any
    history?: any
}

const styleComponent: CSS.Properties = {
    display: 'grid',
    textAlign: 'center'
};
class Registration extends React.Component<Props, any> {
    constructor (props) {
        super(props);
        // this.handleRegistration = this.handleRegistration.bind(this);

        this.state = {
            value: 0
        };
    }

    handleChange = (event: React.SyntheticEvent, newValue: number) => {
        this.setState({ value: newValue });
    };

    componentDidMount () {
        this.callBackendAPI();
    }

    callBackendAPI = () => {
        axios.post('/auth/checkUserAuth')
            .then(res => {
                const data = res.data;
                this.setState({
                    userAuth: true,
                    isAdmin: data.user.role === 'admin'
                });
            })
            .catch(err => {
                console.log('err get data: ', err);
                this.setState({
                    userAuth: false,
                    isAdmin: false
                });
            });
    }

    testFunction () {
        console.log('test funct table');
    }

    render () {
        return (
            <div style={styleComponent}>
                <Box sx={{ width: '100%' }}>
                    <h1>Админпанель</h1>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={this.state.value} onChange={this.handleChange} aria-label="basic tabs example">
                            <Tab label="Химчистки" {...a11yProps(0)} />
                            <Tab label="Услуги" {...a11yProps(1)} />
                            <Tab label="Заказы" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={this.state.value} index={0}>
                        <h3>Химчистки</h3>
                        <TableCleaners page={10} rowsPerPage={10} count={10} onPageChange={this.testFunction}/>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                        <Services />
                    </TabPanel>
                    <TabPanel value={this.state.value} index={2}>
                        <Orders />
                    </TabPanel>
                </Box>
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
