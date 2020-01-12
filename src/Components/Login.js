import React from "react";
// import loginButtonCSS from "../css/LoginButtons.css"
import thetaXiLetters from "../img/lettersPurple6.png";
import * as Constants from "../constants/constants"
import axios from "axios"
import {Redirect} from "react-router-dom";
import autoBind from "auto-bind";


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            username: "",
            password: "",
            correctLoginInfo: true,
            hovered: false,
            createUser: false,
        };

        autoBind(this)

        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
    }

    getDivStyle() {
        return {
            backgroundColor: "#3f4552",
            padding: "0 .01em 5em 0.1em",
            border: "none",
            borderRadius: "5px",
            clear: "both",
            textAlign: "left",
            margin: "60px auto",
            width: "30rem",
            height: "auto"

        }
    }

    getTopTextStyle() {
        return {
            color: "white",
            textAlign: "center"

        }
    }

    getLoginTextInputStyle() {
        return {
            backgroundColor: "#282c34",
            border: "0",
            height: "18px",
            width: "80%",
            padding: "20px 0",
            margin: "5px 10%",
            borderRadius: "5px",
            borderWidth: "1px"
        }
    }

    getCreateUserAMNotice() {
        return {
            // backgroundColor: "#282c34",
            border: "0",
            // height: "18px",
            width: "80%",
            // padding: "20px 0",
            margin: "20px 10% 0 10%",
            borderRadius: "5px",
            borderWidth: "1px"
        }
    }

    getSumbitStyle() {
        return {
            // borderColor: this.state.hovered ? "#3f4552": Constants.colorPrimary,
            borderColor: Constants.colorPrimary,
            display: "block",
            borderRadius: "15px",
            height: "40px",
            // color: this.state.hovered ? "#3f4552": Constants.colorPrimary,
            color: "black",
            fontSize: "100%",
            width: "120px",
            textAlign: "center",
            marginRight: "10px",
            float: "left",
            borderStyle: "solid",
            borderWidth: "2px",
            // backgroundColor: this.state.hovered ? Constants.colorPrimary :"#3f4552" ,
            backgroundColor: Constants.colorPrimary,
        }
    }

    getErrorStyle() {
        return {
            color: Constants.colorError,
            fontSize: "24px",
            margin: "8px 45px",
            textAlign: "center",
            display: "block"
        }
    }

    handleUserNameChange(event) {
        this.setState({username: event.target.value});
    }

    handleCreateUser(event) {
        event.preventDefault();
        this.setState({createUser: !this.state.createUser})
    }

    handleFirstNameChange(event) {
        this.setState({firstName: event.target.value});
    }

    handleLastNameChange(event) {
        this.setState({lastName: event.target.value});
    }

    handleKappaSigmaChange(event) {
        this.setState({kappaSimga: parseInt(event.target.value, 10)});
    }

    handleBigChange(event) {
        this.setState({big: parseInt(event.target.value, 10)});
    }

    handleSubmit(event) {

        let currentComp = this


        if (this.state.createUser) {
            let newUser = {

                userName: this.state.username,
                password: this.state.password,
                big: this.state.big,
                kappaSigma: this.state.kappaSimga,
                brother: this.state.kappaSimga !== 0,
                firstName: this.state.firstName,
                lastName: this.state.lastName
            };

                axios.post(Constants.baseUrl + "rest/security/createuser", newUser).then(res => {

                    if (res.data.usernameTaken){
                        this.setState({usernameTaken: res.data.usernameTaken})
                    }
                    else {
                        currentComp.setState({createUser:false, redirectFromCreateUser: true, usernameTaken: res.data.usernameTaken})

                    }

                }).catch(function (error) {
                    console.log(error.response)
                    if (error.response.status === 401){
                        currentComp.setState({loggedOn: false})
                    }
                    // currentComponent.setState({loggedOn: false})
                });

            //     @get: NotBlank
            //     val firstName: String = "",
            // @get: NotBlank
            // var password: String = "",
            //     @get: NotBlank
            // val lastName: String = "",
            //
            // @get: NotNull
            // val kappaSigma: Int = 0,
            //
            // @get: NotNull
            // val big: Int = 0,
            // @get: NotNull
            // val brother: Boolean = false,
            //
            // @get: NotNull
            // val active: Boolean = true



        } else {

            let data = {

                username: this.state.username,
                password: this.state.password

            };
            axios.post(Constants.baseUrl + "rest/authenticate", data).then(res => {
                const data = res.data;
                console.log("Login JWT: " + data.jwt);
                document.cookie = "jwttoken=" + data.jwt;
                currentComp.setState({redirect: true})


            }).catch(function (error) {

                if (error.response.status === 401) {
                    currentComp.setState({correctLoginInfo: false});
                }

            });

        }


        event.preventDefault();
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    toggleHover = () => this.setState({hovered: !this.state.hovered});




    render() {

        if (!this.state.redirect) {
            return (
                <div style={this.getDivStyle()} className={"loginDiv"}>

                    <form onSubmit={this.handleSubmit}>
                        <img style={{
                            margin: "2em 10% 0 10%",
                            width: "80%",
                            height: "auto"
                        }} src={thetaXiLetters}/>


                        {!this.state.correctLoginInfo &&
                        <label style={this.getErrorStyle()}> Incorrect Username or Password</label>

                        }

                        {this.state.correctLoginInfo &&
                        <h1 className={"loginPage"} style={this.getTopTextStyle()}>Welcome</h1>}

                        {this.state.redirectFromCreateUser &&
                        <h2 style={this.getTopTextStyle()}>Please Now Login</h2>}

                        {this.state.usernameTaken &&
                        <label style={this.getErrorStyle()}> Username Already Taken, Please Use A Different One</label>

                        }


                        <div className={"input"} style={{display: "block"}}>

                            <input placeholder={"Username"} className={"login-input"}
                                   style={this.getLoginTextInputStyle()} value={this.state.username}
                                   onChange={this.handleUserNameChange}/>
                            <input type={"password"} placeholder={"Password"} className={"login-input"}
                                   style={this.getLoginTextInputStyle()} value={this.state.password}
                                   onChange={this.handlePasswordChange}/>
                            {this.state.createUser && <div className={"createUser"}>
                                <input placeholder={"First Name"} className={"login-input"}
                                       style={this.getLoginTextInputStyle()} value={this.state.firstName}
                                       onChange={this.handleFirstNameChange}/>
                                <input placeholder={"Last Name"} className={"login-input"}
                                       style={this.getLoginTextInputStyle()} value={this.state.lastName}
                                       onChange={this.handleLastNameChange}/>
                                <input type={"number"} placeholder={"Big's Kappa Sigma"} className={"login-input"}
                                       style={this.getLoginTextInputStyle()} value={this.state.big}
                                       onChange={this.handleBigChange}/>
                                <p style={this.getCreateUserAMNotice()}>Set as 0 if you are an Associate Memeber</p>
                                <input type={"number"} placeholder={"Your Kappa Simga"} className={"login-input"}
                                       style={this.getLoginTextInputStyle()} value={this.state.kappaSimga}
                                       onChange={this.handleKappaSigmaChange}/>

                            </div>}


                        </div>

                        <div style={{margin: "15px 10%"}}>

                            <button style={this.getSumbitStyle()} type="submit"
                                    value="Submit" onMouseLeave={this.toggleHover}
                                    onMouseEnter={this.toggleHover}>Submit
                            </button>
                            {!this.state.createUser &&
                            <button style={this.getSumbitStyle()} onClick={this.handleCreateUser}
                                    onMouseLeave={this.toggleHover} onMouseEnter={this.toggleHover}>Create User
                            </button>
                            }


                        </div>

                    </form>
                </div>
            )
        } else {
            return (
                <div>
                    <Redirect to={"/"}/>
                </div>
            )
        }
    }

}

export default Login