import React from 'react';
import Scheduler, { Resource } from 'devextreme-react/scheduler'
import { Button, Popup, Icon } from 'semantic-ui-react';
import { Navigate } from 'react-router-dom';

import axiosInstance from '../../../serverConnection/axios';
import { authHeader } from '../../../serverConnection/authHeader';
import OpnePortal from '../../../HelpPages/OpenPortal';
import avatar from '../../../images/avatar.png';
import { appointments } from './appointments';
import AppointmentTemplate from './AppointmentTemplate';
import NotAuthorized from '../../../HelpPages/NotAuthorized';

const currentDate = new Date();
const views = ['month'];

class MakeAnAppointment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            children: [],
            openPortal: false,
            portalMessage: '',
            data: appointments,
            notAuthorized: false
        }
    }

    allUsers(allUsers) {
        allUsers.forEach(user => {
            var employee = {};
            employee['text'] = user.name + ' ' + user.lastName;
            employee['id'] = user.idUser;
            employee['color'] = '#ff8533';
            employee['image'] = { avatar: true, src: user.image ? 'http://localhost:9000/' + user.image : avatar };
            this.state.users.push(employee);
        });
    }

    allChildren(allChildren) {
        allChildren.forEach(child => {
            var children = {};
            children['text'] = child.name + ' ' + child.lastName;
            children['id'] = child.idChild;
            children['avatar'] = 'http://localhost:9000/' + child.image;
            this.state.children.push(children);
        });
    }

    componentDidMount() {
        axiosInstance.get('/admin/allUsers', { headers: authHeader() })
            .then((response) => {
                this.allUsers(response.data.users);
            }).catch((error) => {
                this.setState({ notAuthorized: true });
            });
        axiosInstance.get('/admin/allChildren', { headers: authHeader() })
            .then((response) => {
                this.allChildren(response.data.children);
            }).catch((error) => {
                this.setState({ notAuthorized: true });
            });
    }

    saveAndSendSchedule = () => {
        console.log(this.state.data)
        axiosInstance.post('/admin/saveAndSendSchedule', {}, {
            headers: authHeader(),
            params: {
                schedule: this.state.data
            }
        }).then((response) => {
            if (response.data.statusAdd === 'success' && response.data.statusUpdate === 'success') {
                this.setState({ openPortal: true, portalMessage: response.data.messageAdd });
            } else if (response.data.statusAdd === 'failed') {
                this.setState({ openPortal: false, portalMessage: response.data.messageAdd });
            } else if (response.data.statusUpdate === 'failed') {
                this.setState({ openPortal: false, portalMessage: response.data.messageUpdate });
            }
        }).catch((error) => {
            this.setState({ notAuthorized: true });
        });
    }

    render() {
        return (
            this.state.notAuthorized ? <Navigate to='/notAuthorized' /> :
                <div>
                    <Scheduler
                        timeZone='Europe/Belgrade'
                        dataSource={this.state.data}
                        views={views}
                        defaultCurrentView='month'
                        defaultCurrentDate={currentDate}
                        height={600}
                        showAllDayPanel={true}
                        appointmentRender={AppointmentTemplate}
                    >
                        <Resource
                            label='Teachers'
                            fieldExpr='idUser'
                            dataSource={this.state.users}
                            allowMultiple={false}
                            useColorAsDefault={true}
                        />
                        <Resource
                            label='Children'
                            fieldExpr='idChild'
                            dataSource={this.state.children}
                            allowMultiple={false}
                            useColorAsDefault={true}
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
        )
    }

}

export default MakeAnAppointment;