import React from 'react';
import Scheduler, { Resource } from 'devextreme-react/scheduler'
import { Button, Popup, Icon } from 'semantic-ui-react';

import axiosInstance from '../../serverConnection/axios';
import { authHeader } from '../../serverConnection/authHeader';
import OpnePortal from '../../HelpPages/OpenPortal';

const currentDate = new Date();
const views = ['month'];
const data = [];
const colors = ['#ff8533', '#4747d1', '#ff1a8c', '#9900ff', '#00b33c', '#ff0000'];

class MakeAnAppointment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            children: [],
            data: [],
            openPortal: false,
            portalMessage: ''
        }
    }

    allUsers(allUsers) {
        allUsers.forEach(user => {
            var employee = {};
            employee['text'] = user.name + ' ' + user.lastName;
            employee['id'] = user.idUser;
            employee['color'] = colors[(Math.random() * colors.length) | 0];
            employee['avatra'] = 'http://localhost:9000/' + user.image;
            this.state.users.push(employee);
        });
    }

    allChildren(allChildren) {
        allChildren.forEach(child => {
            var children = {};
            children['text'] = child.name + ' ' + child.lastName;
            children['id'] = child.idChild;
            children['avatra'] = 'http://localhost:9000/' + child.image;
            this.state.children.push(children);
        });
    }

    componentDidMount() {
        axiosInstance.get('/admin/allUsers', { headers: authHeader() })
            .then((response) => {
                this.allUsers(response.data.users);
            })
        axiosInstance.get('/admin/allChildren', { headers: authHeader() })
            .then((response) => {
                this.allChildren(response.data.children);
            })
    }

    saveAndSendSchedule = () => {
        axiosInstance.post('/admin/saveAndSendSchedule', {}, {
            headers: authHeader(),
            params: {
                schedule: data
            }
        }).then((response) => {
            var message = '';
            if (response.data.status === 'success') {
                message = 'Teachers and parents are informed.';
                this.setState({ openPortal: true, portalMessage: message });
            } else {
                message = "Something want wrong emails aren't sent.";
                this.setState({ openPortal: false, portalMessage: message });
            }
        });
    }

    render() {
        return (
            <div>
                <Scheduler
                    timeZone='Europe/Belgrade'
                    dataSource={data}
                    views={views}
                    defaultCurrentView='month'
                    defaultCurrentDate={currentDate}
                    height={600}
                    showAllDayPanel={true}
                    firstDayOfWeek={1}
                    startDayHour={8}
                    endDayHour={18}
                >
                    <Resource
                        label='Teachers'
                        fieldExpr='teacherID'
                        dataSource={this.state.users}
                        allowMultiple={false}
                        useColorAsDefault={true}
                    />
                    <Resource
                        label='Children'
                        fieldExpr='childID'
                        dataSource={this.state.children}
                        allowMultiple={false}
                    />
                </Scheduler>
                <div style={{ padding: '10px' }}>
                    <Popup content='Save schedule and send it to teachers and parents' trigger={
                        <Button animated floated='right' onClick={this.saveAndSendSchedule} inverted color='orange'>
                            <Button.Content visible>Inform</Button.Content>
                            <Button.Content hidden>
                                <Icon name='mail' />
                            </Button.Content>
                        </Button>
                    } />
                </div>
                {this.state.openPortal && <OpnePortal open={this.state.openPortal}
                    message={this.state.portalMessage}
                    handleClose={() => this.setState({ openPortal: !this.state.openPortal })} />}
            </div>
        );
    }
}

export default MakeAnAppointment;