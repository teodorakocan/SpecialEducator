import React, { useState } from 'react';
import Scheduler, { Resource } from 'devextreme-react/scheduler'
import { Button, Image } from 'semantic-ui-react';

import axiosInstance from '../../serverConnection/axios';
import { authHeader } from '../../serverConnection/authHeader'

const currentDate = new Date(2021, 5, 2, 11, 30);
const views = ['month'];
const data = [];
const colors = ['#ff8533', '#4747d1', '#ff1a8c', '#9900ff', '#00b33c', '#ff0000'];

class MakeAnAppointment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            children: [],
            data: [{
                text: '',
                employeeID: 0,
                startDate: new Date(),
                endDate: new Date(),
            }]
        }
    }

    allUsers(allUsers) {
        allUsers.map(user => {
            var employee = {};
            employee['text'] = user.name + ' ' + user.lastName;
            employee['id'] = user.idUser;
            employee['color'] = colors[(Math.random()*colors.length)|0];
            employee['avatra'] = 'http://localhost:9000/' + user.image;
            this.state.users.push(employee);
        });
    }

    allChildren(allChildren) {
        allChildren.map(child => {
            var children = {};
            children['text'] = child.name + ' ' + child.lastName;
            children['id'] = child.idChild;
            children['avatra'] = 'http://localhost:9000/' + child.image;
            this.state.children.push(children);
        });
    }

    componentDidMount() {
        axiosInstance.get('/user/allUsers', { headers: authHeader() })
            .then((response) => {
                this.allUsers(response.data.users);
            })
        axiosInstance.get('/user/allChildren', { headers: authHeader() })
            .then((response) => {
                this.allChildren(response.data.children);
            })
    }

    getData() {
        console.log(data);
    }

    render() {
        return (
            <div>
                <Scheduler
                    timeZone='America/Los_Angeles'
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
                <div>
                    <Button onClick={this.getData}>Click Here</Button>
                </div>
            </div>
        );
    }
}

export default MakeAnAppointment;