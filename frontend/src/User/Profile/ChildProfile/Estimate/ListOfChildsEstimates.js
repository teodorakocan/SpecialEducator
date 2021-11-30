import React, { useEffect, useState } from 'react';
import { List, Grid, Button, Checkbox, Message, Icon, Popup } from 'semantic-ui-react';
import { useNavigate } from 'react-router';

import axiosInstance from '../../../../serverConnection/axios';
import { authHeader } from '../../../../serverConnection/authHeader';

function ListOfChildsEstimates(props) {

    const [childsEstimates, setChildsEstimates] = useState([]);
    const [listIsChanged, setListIsChanged] = useState(false);
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
            <List.Item href='#'>Estimate for {childsEstimate.date}</List.Item>
        </List.Item>
    );

    useEffect(async () => {
        axiosInstance.get('/authUser/listOfChildsEstimates', {
            headers: authHeader(),
            params: {
                childId: props.childId
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
                }
            }).catch((error) => {
                throwError(error);
            })
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
        childsEstimates.length === 0 ?
            <Grid.Row>
                <Message
                    warning
                    header='List is empty'
                    content='No estimate was added.'
                />
            </Grid.Row > :
            < Grid.Row >
                <Grid.Column width={10}>
                    <List divided verticalAlign='middle' bulleted>
                        {esimateContent}
                    </List>
                </Grid.Column>
            </Grid.Row>
    )
}
export default ListOfChildsEstimates;