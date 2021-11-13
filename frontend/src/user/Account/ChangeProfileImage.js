import React, { useState } from 'react';
import { Image, Grid, Icon, Button, Segment } from 'semantic-ui-react';
import { InputFile } from 'semantic-ui-react-input-file';

function ChangeProfileImage(props) {

    const [userImage, setUserImage] = useState('http://localhost:9000/' + props.image);
    const [file, setFile] = useState([]);

    const handleUpload = (e) => {
        e.preventDefault();
        if (e.target.files.length !== 0) {
            var newImage = userImage;
            newImage = URL.createObjectURL(e.target.files[0]);
            setUserImage(newImage);
            setFile(e.target.files)
        }
    }

    function onClickUploadImage(){
        props.onClickUploadImage(file);
    }

    return (
        <Segment raised>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <Image src={userImage} size='big' />
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <InputFile
                            action={<Button basic><Icon name='file' /></Button>}
                            input={{
                                id: 'input-control-id',
                                onChange: handleUpload
                            }}
                        />
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column width={12}>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Button animated color='orange' onClick={onClickUploadImage}>
                            <Button.Content visible>Upload</Button.Content>
                            <Button.Content hidden>
                                <Icon name='upload' />
                            </Button.Content>
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    )
};

export default ChangeProfileImage;