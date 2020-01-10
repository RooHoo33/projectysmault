import React from "react";
import autoBind from "auto-bind";
import * as Constants from "../../constants/constants";
import {choreAndDayInputStyle} from "../../constants/constants";


class UserPrefDayAndChoreSelector extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chore: this.props.chore,
            day: this.props.day,
            preference: this.props.preference,

        };
        autoBind(this)
    }
    handlePreferenceChange(event){
        this.setState({preference: parseInt(event.target.value, 10)});
        this.props.updateUserPreferenceFun(this.state.chore.id, this.state.day.id, parseInt(event.target.value, 10))

    }
    getPreferenceStyle(){
        return{
            display: "block",
            width: "40%",
            margin: "6px auto 0 auto",
            borderRadius: "5px",
            borderWidth: "1px",
            textIndent: "5px",
            height: "40px",
            backgroundColor: this.state.preference !== 0 ? "#282c34" : Constants.colorErrorBackground,
            borderColor: "#282c34",
            color: "white",
            fontSize: "16px"

        }
    }


    render() {
        return(
            <div style={Constants.getChortPrefernceGridItemStyle()}>
            {/*<p>Chore: {this.props.chore.name}</p>*/}
            {/*    <p>Day: {this.props.day.name}</p>*/}
            {/*    <p>{this.props.preference}</p>*/}
            <form>
                <input type={"number"}
                       style={this.getPreferenceStyle()}
                        value={this.state.preference}
                       onChange={this.handlePreferenceChange}/>
            </form>
            </div>
        )
    }

}

export default UserPrefDayAndChoreSelector