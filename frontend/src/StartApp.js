import React from 'react';

import MainHomePage from './MainPage/MainHomePage';
import Login from './Login/Login';

class StartApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogged: localStorage.getItem('loggedIn') ? true : false
        };
    }

    onHomePage = async (logged) => {
        this.setState({ isLogged: logged });
        window.location.reload(false);
    }

    render() {
        return (
            this.state.isLogged ? <MainHomePage /> : <Login onHomePage={this.onHomePage} />
        )
    }

};

export default StartApp;
