import React, { useState } from 'react';
import { Grid, Input, Button, Feed, Image } from 'semantic-ui-react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { children } from './children';
import axiosInstance from '../../serverConnection/axios';
import { authHeader } from '../../serverConnection/authHeader';

function HomePage() {

    const [childName, setChildName] = useState();
    const [allChildren, setAllChildren] = useState(children);
    const [noRequestedChild, setNoRequestedChild] = useState(false);
    const navigate = useNavigate();

    const allChildrenComponents = Object.values(allChildren).map((child, index) =>
        <Feed key={index}>
            <Feed.Event>
                <Feed.Label>
                    <Image src={'http://localhost:9000/' + child.image} avatar />
                </Feed.Label>
                <Feed.Content>
                    <Feed.Summary>
                        <Link to={'/profile/child/' + child.idChild}>{child.name + ' ' + child.lastName}</Link>
                    </Feed.Summary>
                </Feed.Content>
            </Feed.Event>
        </Feed>
    )

    function onClickSearchChild() {
        if (childName !== '') {
            axiosInstance.get('/authUser/searchChild', {
                headers: authHeader(),
                params: {
                    fullName: childName
                }
            })
                .then((response) => {
                    if (response.data.status === 'success') {
                        if (response.data.child.length > 0) {
                            setAllChildren(response.data.child);
                            setNoRequestedChild(false);
                        } else {
                            setAllChildren(response.data.child);
                            setNoRequestedChild(true);
                        }
                    }
                }).catch((error) => {
                    if (typeof error.response === 'undefined') {
                        navigate('/notFound');
                    } else if (error.response.status === 403) {
                        navigate('/notAuthenticated');
                    } else {
                        navigate('/notFound');
                    }
                });
        } else {
            setAllChildren(children);
            setNoRequestedChild(false);
        }
    }

    return (
        <Grid divided='vertically'>
            <Grid.Row >
                <Grid.Column>
                    <Input
                        icon={{ name: 'search' }}
                        placeholder='Search child...'
                        onChange={(e) => setChildName(e.target.value)}
                        action={<Button basic onClick={onClickSearchChild}> </Button>}
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row >
                <Grid.Column>
                    {allChildrenComponents}
                    {noRequestedChild && <div>Child with requested name is not registered...</div>}
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default HomePage;