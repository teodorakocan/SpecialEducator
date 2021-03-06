import React from 'react';

import axiosInstance from '../../../serverConnection/axios';
import { authHeader } from '../../../serverConnection/authHeader';
import AddAnamnesis from './AddAnamnesis';
import OpenPortal from '../../../HelpPages/OpenPortal';
import AddChild from './AddChild';
import AddParent from './AddParent';
import AddEstimate from '../../../Profiles/ChildProfile/Estimates/AddEstimate';

class MainNewChildPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            parent: {},
            child: {},
            anamnesis: {},
            selectedFile: [],
            openPortal: false,
            portalMessage: '',
            addEstimate: false,
        };
    }

    handleParentInputChange = (name, value) => {
        var parentData = this.state.parent;
        parentData[name] = value;
        this.setState({ parent: parentData });
    }

    handleParentDropdownChange = (data) => {
        var parentData = this.state.parent;
        parentData[data.name] = data.value;
        this.setState({ parent: parentData });
    }

    handleChildInputChange = (name, value) => {
        var childData = this.state.child;
        childData[name] = value;
        this.setState({ child: childData });
    };

    handleUpload = (files) => {
        var childData = this.state.child;
        childData['image'] = URL.createObjectURL(files[0]);
        this.setState({ selectedFile: files, child: childData });
    };

    handleAnamnesisInputChanges = (name, value) => {
        var anamnesisData = this.state.anamnesis;
        anamnesisData[name] = value;
        this.setState({ anamnesis: anamnesisData });
    }

    onClickNextStep = () => {
        this.setState({ step: this.state.step + 1 });
        if (this.state.step === 3) {
            var formData = new FormData();
            formData.append('file', this.state.selectedFile[0]);

            axiosInstance.post('/admin/addChild', formData, {
                headers: authHeader(),
                params: {
                    parent: this.state.parent,
                    child: this.state.child,
                    anamnesis: this.state.anamnesis
                }
            }).then((registration) => {
                if (registration.data.status !== 'success') {
                    this.setState({ step: this.state.step - 1 });
                } else {
                    this.setState({ openPortal: true, portalMessage: registration.data.message });
                }
            }).catch((error) => {
                if (typeof error.response === 'undefined') {
                    this.props.history.push('/notFound');
                } else if (error.response.status === 403) {
                    this.props.history.push('/notAuthenticated');
                } else if (error.response.status === 404) {
                    this.props.history.push('/notFound');
                } else {
                    this.props.history.push('/notAuthorized');
                }
            });
        }
    }

    onClickPrevStep = () => {
        this.setState({ step: this.state.step - 1 });
    }

    render() {
        switch (this.state.step) {
            case 1:
                return (
                    <AddParent handleParentInputChange={this.handleParentInputChange} onClickNextStep={this.onClickNextStep}
                        handleParentDropdownChange={this.handleParentDropdownChange} parent={this.state.parent} />
                )
            case 2:
                return (
                    <AddChild onClickPrevStep={this.onClickPrevStep} onClickNextStep={this.onClickNextStep}
                        child={this.state.child} handleChildInputChange={this.handleChildInputChange}
                        handleUpload={this.handleUpload} />
                )
            default:
                return (
                    <div>
                        {!this.state.addEstimate &&<AddAnamnesis onClickNextStep={this.onClickNextStep} anamnesis={this.state.anamnesis}
                            onClickPrevStep={this.onClickPrevStep} handleAnamnesisInputChanges={this.handleAnamnesisInputChanges} />}
                        {this.state.openPortal && <OpenPortal open={this.state.openPortal} message={this.state.portalMessage} handleClose={() => this.setState({ openPortal: false, addEstimate: true })} />}
                        {this.state.addEstimate && !this.state.openPortal && <AddEstimate/>}
                    </div>
                )
        }
    }
};

export default MainNewChildPage;