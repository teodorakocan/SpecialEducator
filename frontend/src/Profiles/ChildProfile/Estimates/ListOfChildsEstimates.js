import React, { useEffect, useState } from 'react';
import { List, Grid, Button, Segment, Input, Message, Icon, Popup } from 'semantic-ui-react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

import axiosInstance from '../../../serverConnection/axios';
import { authHeader } from '../../../serverConnection/authHeader';
import OpenPortal from '../../../HelpPages/OpenPortal';

function ListOfChildsEstimates(props) {

    const { role, id } = useParams();
    const [childsEstimates, setChildsEstimates] = useState([]);
    const [listIsChanged, setListIsChanged] = useState(false);
    const [searchDate, setSearchDate] = useState();
    const [openPortal, setOpenPortal] = useState(false);
    const [portalMessage, setPortalMessage] = useState();
    const navigate = useNavigate();

    const esimateContent = Object.values(childsEstimates).map((childsEstimate, index) =>
        <List.Item key={index}>
            {props.teacherRole === 'admin' &&
                <List.Content floated='right'>
                    <Popup content='Estimate report' trigger={
                        <Button
                            icon
                            inverted
                            color='red'
                            onClick={() => onClickDeleteEstimate(childsEstimate.id)}>
                            <Icon name='trash' />
                        </Button>} />
                </List.Content>
            }
            <List.Item href={'/estimate/' + childsEstimate.id}>Estimate for {childsEstimate.date}</List.Item>
        </List.Item>
    );

    useEffect(async () => {
        axiosInstance.get('/authUser/listOfChildsEstimates', {
            headers: authHeader(),
            params: {
                childId: id
            }
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    var estimates = [];

                    response.data.childsEstimates.forEach(estimate => {
                        var dateOfAdding = estimate.date.split('T');

                        var estimateInfo = {};
                        estimateInfo['id'] = estimate.idEstimate;
                        estimateInfo['date'] = dateOfAdding[0];

                        estimates.push(estimateInfo);
                    });
                    setChildsEstimates(estimates);
                }
            }).catch((error) => {
                throwError(error);
            });

        setListIsChanged(false);
    }, [listIsChanged])


    function onClickDeleteEstimate(estimateId) {
        axiosInstance.post('/admin/deleteEstimate', {}, {
            headers: authHeader(),
            params: {
                estimateId: estimateId
            }
        })
            .then((response) => {
                if (response.data.status === 'success') {
                    setListIsChanged(true);
                    setOpenPortal(true);
                    setPortalMessage('Estimate is deleted');
                }
            }).catch((error) => {
                throwError(error);
            })
    }

    function handleSearch(e) {
        e.preventDefault();
        setSearchDate(e.target.value);
    }

    function onClickSerachEstimate() {
        if (searchDate) {
            axiosInstance.get('/authUser/searchEstimate', {
                headers: authHeader(),
                params: {
                    date: searchDate
                }
            })
                .then((response) => {
                    if (response.data.status === 'success') {
                        setChildsEstimates(response.data.estimate);
                    }
                }).catch((error) => {
                    throwError(error);
                })
        } else {
            setListIsChanged(true);
        }
    }

    function onClickRefreshList() {
        setListIsChanged(true);
    }

    function throwError(error) {
        if (typeof error.response === 'undefined') {
            navigate('/notFound');
        } else if (error.response.status === 403) {
            navigate('/notAuthenticated');
        } else {
            navigate('/notFound');
        }
    }

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={16}>
                    <Segment>
                        <Input placeholder='Search...' type='date' onChange={handleSearch} />

                        <Button icon inverted color='orange' floated='right' onClick={onClickRefreshList}>
                            <Icon name='refresh' />
                        </Button>

                        <Button icon inverted color='orange' floated='right' onClick={onClickSerachEstimate}>
                            <Icon name='search' />
                        </Button>
                    </Segment>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                {childsEstimates.length === 0 ?
                    <Grid.Column width={16}>
                        <Message
                            warning
                            header='List is empty'
                            content='No estimate was added.'
                        />
                    </Grid.Column > :
                    <Grid.Column width={16}>
                        <List divided verticalAlign='middle' bulleted>
                            {esimateContent}
                        </List>
                    </Grid.Column>}
            </Grid.Row>
            {openPortal && <OpenPortal open={openPortal} message={portalMessage} handleClose={() => setOpenPortal(!openPortal)} />}
        </Grid>

    )
}
export default ListOfChildsEstimates;