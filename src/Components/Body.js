import React from "react";

import thetaXiLetters from "../img/lettersPurple6.png"
import AddressFooter from "./AddressFooter";
import * as Constants from "../constants/constants";


import axios from 'axios';

class Body extends React.Component {

    getStyle() {
        return {
            clear: "both",
            textAlign: "left",
            margin: "60px 10%",
            width: "80%",
            height: "auto"

        }
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