import React from "react";

import thetaXiLetters from "../img/lettersPurple6.png"
import AddressFooter from "./AddressFooter";
import * as Constants from "../constants/constants";


import axios from 'axios';

class Body extends React.Component {

    state = {
        users: []
    };

    getStyle() {
        return {
            clear: "both",
            textAlign: "left",
            margin: "60px 10%",
            width: "80%",
            height: "auto"

        }
    }

    componentDidMount() {

        axios.get(Constants.baseUrl + 'rest/users',{
            crossorigin:true,
            auth: {
                username: 'test',
                password: 'test'
            }

        })
            .then(res => {
                const users = res.data;
                this.setState({ users });
            }).catch(function (error) {
            if (error.response) {
                if (error.response.status === 401){
                    console.log("Unauthorised")
                }
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });


    }
    displayUsers(){
        return(
        <div className={"users"}>
            {this.state.contacts.map((user) => (
            <div className={user.userId}>
            <h5 className="card-title">{user.userName}</h5>
            </div>
        ))}
        </div>
        )
    }

    render() {
        return (

            <div style={this.getStyle()} className={"mainDiv"}>
                {/*<div className={"users"}>*/}
                {/*    {this.state.users.map((user) => (*/}
                {/*        <div className={user.userId}>*/}
                {/*            <h5 className="card-title">{user.userName}</h5>*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</div>*/}
                <img style={this.getStyle()} src={thetaXiLetters}/>
                <AddressFooter/>
            </div>

        )
    }
}

export default Body;