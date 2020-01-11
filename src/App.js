import React from 'react';
// import logo from './img/lettersPurple6.png';
import HeaderButton from "./Components/HeaderButton";
import Body from "./Components/Body";
import Login from "./Components/Login";
import HeaderHomeButton from "./Components/HeaderHomeButton"
import decode from "jwt-decode";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Link
} from "react-router-dom";

import Users from "./Components/Users";
import ChoreChartAdmin from "./Components/ChoreChartAdmin";
import ChoreChart from "./Components/ChoreChart";
import SignOut from "./Components/SignOut";

// import './App.css';

class App extends React.Component {


    constructor(props) {
        super(props);

        this.setAuth = this.setAuth.bind(this)
    }

    state = {
        jwt: "",
        auth: false
    };

    setAuth(auth) {
        this.setState({auth: auth})
    }

    componentDidMount() {

        let loggedIn = false;

        if (document.cookie.replace(/(?:(?:^|.*;\s*)jwttoken\s*\=\s*([^;]*).*$)|^.*$/, "$1")){
            if (decode(document.cookie.replace(/(?:(?:^|.*;\s*)jwttoken\s*\=\s*([^;]*).*$)|^.*$/, "$1")).exp > Date.now() / 1000){
                loggedIn = true
            }
        }


        this.setState({loginButtonMessage: loggedIn? "Sign Out" : "Log In", loggedIn: loggedIn});
    }


    render() {

        if (this.state.jwt !== "") {

        }
        return (

            <div className="App">
                <div className={"header"} >
                    <HeaderButton displayName={this.state.loginButtonMessage} link={this.state.loggedIn? "/signout" : "/login"}/>
                    <HeaderButton displayName={"Chore Chart"} link={"/chorechart"}/>
                    <HeaderButton displayName={"Users"} link={"/users"}/>
                    <HeaderHomeButton displayName={"Home"} link={"/"}/>

                </div>

                <div className={"content"} style={{clear: "both"}}>

                    <Router>
                        <Switch>

                            <Route exact path="/">
                                {/*<header className="App-header"/>*/}
                                <Body/>
                            </Route>

                            <Route exact path="/chorechart">
                                {/*<header className="App-header"/>*/}
                                <ChoreChart/>
                            </Route>

                            <Route exact path="/chorechart/admin">
                                <ChoreChartAdmin/>
                            </Route>


                            <Route exact path="/users">
                                <Users setAuth={this.setAuth}/>
                            </Route>
                            <Route exact path={"/login"}>
                                <Login/>
                            </Route>

                            <Route exact path={"/signout"}>
                                <SignOut/>
                            </Route>


                        </Switch>

                        {/*<img  className={"App-logo"} src={logo}/>*/}


                        {/*    <Body/>*/}
                        {/*</header>*/}
                    </Router>
                </div>

            </div>
        )
    }
}


const colors = {
    primary: "#338355",
    complementary: "#833360",
    analogousOne: "#388333",
    analogousTwo: "#33837d",
    triadicOne: "#2e85d6",
    triadicTwo: "#553383"
};
export default App;
