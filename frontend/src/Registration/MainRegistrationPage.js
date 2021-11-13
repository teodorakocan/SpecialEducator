import React from "react";

import CenterRegistration from "./CenterRegistration";
import UserRegistration from "./UserRegistration";
import Login from "../Login/Login";
import Steps from './Steps';
import axiosInstance from "../serverConnection/axios";

class MainRegistrationPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            newCenter: {},
            newUser: {},
            seletedFile: []
        };
    }

    onInputCenterChange = (e, name) => {
        var center = this.state.newCenter;
        let value = '';
        if (name === 'state') {
            value = e.target.innerText;
        } else {
            value = e.target.value;
        }
        center[name] = value;
        this.setState({ newCenter: center });
    }

    onDropdownCenterChange = (data) => {
        var center = this.state.newCenter;
        center[data.name] = data.value;
        this.setState({ newCenter: center });
    }

    onInputUserChange = (e, name) => {
        var user = this.state.newUser;
        user[name] = e.target.value;
        this.setState({ newUser: user });
    }

    handleUpload = (e) => {
        if (e.target.files.length !== 0) {
            var user = this.state.newUser;
            user['image'] = URL.createObjectURL(e.target.files[0]);
            this.setState({ seletedFile: e.target.files, newUser: user });
        }
    }

    onClickNextStep = () => {
        this.setState({ step: this.state.step + 1 });
    }

    onClickFinalStep = async () => {
        var formData = new FormData();
        formData.append('file', this.state.seletedFile[0]);

        var user = this.state.newUser;
        var center = this.state.newCenter;
        const registration = await axiosInstance.post('api/center/registration', formData, {
            params: {
                center: center,
                user: user
            }
        });
        if (registration.data.status === 'success') {
            this.setState({ step: this.state.step + 1 });
        } else {
            this.setState({ step: this.state.step });
        }
    }

    onClickPrevStep = () => {
        this.setState({ step: this.state.step - 1 });
    }

    render() {
        switch (this.state.step) {
            case 1:
                return (
                    <div>
                        <Steps step={this.state.step} />
                        <CenterRegistration onClickNextStep={this.onClickNextStep}
                            center={this.state.newCenter} onInputCenterChange={this.onInputCenterChange}
                            onDropdownCenterChange={this.onDropdownCenterChange} />
                    </div>
                )
            case 2:
                return (
                    <div>
                        <Steps step={this.state.step} />
                        <UserRegistration onClickFinalStep={this.onClickFinalStep}
                            onClickPrevStep={this.onClickPrevStep} user={this.state.newUser}
                            onInputUserChange={this.onInputUserChange} handleUpload={this.handleUpload} />
                    </div>
                )
            default:
                return <Login />
        }
    }
}

export default MainRegistrationPage;