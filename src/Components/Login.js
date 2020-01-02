import React from "react";
// import loginButtonCSS from "../css/LoginButtons.css"
import thetaXiLetters from "../img/lettersPurple6.png";
import * as Constants from "../constants/constants"
import axios from "axios"
import { Redirect } from "react-router-dom";


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            username: "",
            password: "",
            correctLoginInfo: true,
            hovered: false,
        };

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

    getSumbitStyle() {
        return {
            borderColor: this.state.hovered ? "#3f4552": Constants.colorPrimary,
            display: "block",
            borderRadius: "15px",
            height: "40px",
            color: this.state.hovered ? "#3f4552": Constants.colorPrimary,
            fontSize: "100%",
            width: "120px",
            textAlign: "center",
            margin: "0 10%",
            float: "left",
            borderStyle: "solid",
            borderWidth: "2px",
            backgroundColor: this.state.hovered ? Constants.colorPrimary :"#3f4552" ,
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

    handleSubmit(event) {

        let currentComp = this

        let data = {

            username: this.state.username,
            password: this.state.password

        };
        axios.post("http://localhost:8080/authenticate", data).then(res => {
            const data = res.data;
            console.log("Login JWT: " + data.jwt);
            document.cookie = "jwttoken=" + data.jwt;
            currentComp.setState({redirect: true})


        }).catch(function (error) {

            if (error.response.status === 401) {
                currentComp.setState({correctLoginInfo: false});
            }

        });

        event.preventDefault();
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    toggleHover = () => this.setState({hovered:!this.state.hovered});



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

                        {this.state.correctLoginInfo && <h1 className={"loginPage"} style={this.getTopTextStyle()}>Welcome</h1>}


                        <div className={"input"} style={{display: "block"}}>

                            <input placeholder={"Username"} className={"login-input"}
                                   style={this.getLoginTextInputStyle()} value={this.state.username}
                                   onChange={this.handleUserNameChange}/>
                            <input type={"password"} placeholder={"Password"} className={"login-input"}
                                   style={this.getLoginTextInputStyle()} value={this.state.password}
                                   onChange={this.handlePasswordChange}/>

                        </div>

                        <div style={{margin: "15px 0"}}>

                            <button style={this.getSumbitStyle()} type="submit"
                                     value="Submit" onMouseLeave={this.toggleHover} onMouseEnter={this.toggleHover}>Submit
                            </button>

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