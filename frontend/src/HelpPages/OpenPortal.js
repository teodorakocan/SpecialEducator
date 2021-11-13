import React from 'react';

import { Button, Segment, Portal } from 'semantic-ui-react'
import '../Home/HomeStyle.css';

function OpenPortal(props) {

    function handleClose(){
        props.handleClose();
    }

    return (
        <Portal onClose={handleClose} open={props.open}>
            <Segment
                style={{
                    left: '40%',
                    position: 'fixed',
                    top: '50%',
                    zIndex: 1000,
                }}
            >
                <p className='subTitle'>{props.message}</p>

                <Button
                    content='Close'
                    inverted 
                    color='orange'
                    onClick={handleClose}
                />
            </Segment>
        </Portal>
    )
}

export default OpenPortal;