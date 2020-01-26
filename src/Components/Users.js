import React from "react";
import * as Constants from "../constants/constants";

import axios from 'axios';
import {Redirect} from "react-router-dom";


class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedOn: true,
            users: []
        }
    }

    getUserStyle(){
        return {
            backgroundColor: "#3f4552",
            margin: "15px auto",
            width: "45rem",
            height: "auto",
            textIndent: "15px"
        }
    }


    componentDidMount() {

        let currentComponent = this;

        let config = {
            headers: {
                Authorization: "Bearer " + document.cookie.replace(/(?:(?:^|.*;\s*)jwttoken\s*\=\s*([^;]*).*$)|^.*$/, "$1")
            }
        };

        axios.get(Constants.baseUrl + "rest/users", config).then(res => {
            const users = res.data;
            this.setState({users: users});
        }).catch(function (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    currentComponent.setState({loggedOn: false});
                } else {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }

            }
        });
    }


    render() {

        if (!this.state.loggedOn) {
            return <Redirect to={"/login"}/>
        }
        // document.cookie = "username=oeschger";
        // let cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");

        return (<div className={"users"}>
                <table>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Username</th>
                    </tr>
                {this.state.users.map(user =>
                    <h2 style={this.getUserStyle()} className={user.userId}>{user.userName}</h2>)
                }
                </table>
            </div>

        )
    }
}

export default Users