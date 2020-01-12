import React from "react";

import * as Constants from "../constants/constants"


class HeaderButton extends React.Component {

    isLogin(){

        var style = {
            color: "white",
            padding: "12px",

            float: "right",
            margin: "40px 8px",
            // marginTop: "30px",
            borderRadius: "5px",
            textDecorationLine: "none",
            borderStyle: "solid",
            borderWidth: "2px",

        };

        if (this.props.link === "/login"){
            style.borderColor = Constants.colorPrimary;
            style.color = Constants.colorPrimary;
            return style

        } else {
            style.borderColor = Constants.colorSecondary;
            style.color = Constants.colorSecondary;
            return style

        }
    }


    render() {


        return <a href={this.props.link}
                  style={this.isLogin()}>{this.props.displayName}</a>
    }


}




export default HeaderButton