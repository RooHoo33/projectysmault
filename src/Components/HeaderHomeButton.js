import React from "react";
import * as Constants from "../constants/constants";

class HeaderHomeButton extends React.Component{

    getStyle() {
        return {
            color: Constants.colorPrimary,
            padding: "12px",

            float: "left",
            margin: "40px 45px",
            borderRadius: "5px",
            textDecorationLine: "none",
            borderColor: Constants.colorPrimary,
            borderStyle: "solid",
            borderWidth: "2px",
        };

    }
    render() {
        return <a href={this.props.link}
                  style={this.getStyle()}>{this.props.displayName}</a>
    }
}

export default HeaderHomeButton