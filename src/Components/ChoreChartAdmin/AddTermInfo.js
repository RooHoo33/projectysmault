import React from "react";

import * as Constants from "../../constants/constants"
import {Redirect} from "react-router-dom";

import axios from "axios";


class AddTermInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedOn: true,
            term: this.props.term,
            error: false

        };
        this.hover = this.hover.bind(this);
        this.handlePopulationChange = this.handlePopulationChange.bind(this);
        this.handleStartTermChange = this.handleStartTermChange.bind(this);
        this.handleEndTermChange = this.handleEndTermChange.bind(this);
        this.submit = this.submit.bind(this);

    }
    getIconStyle(){
        return {
            color: Constants.colorSuccess,
            marginTop: "11px",
            fontSize: "28px",
            cursor: this.state.hover ? "pointer" : "context-menu"
        }
    }

    getPopulationInputStyle(date = false) {
        return {
            backgroundColor: "#282c34",
            border: "0",
            // height: "100%",
            width: date ? "90%" : "40%",
            fontSize: "16px",
            // padding: "20px 0",
            margin: "5px 0",
            borderRadius: "5px",
            borderWidth: "1px",
            textIndent: "5px"
        }
    }

    hover(){
        this.setState({hover: !this.state.hover});
    }

    handlePopulationChange(event) {
        let localTerm = this.state.term;
        localTerm.population = parseInt(event.target.value, 10);
        this.setState({term: localTerm});
    }

    handleStartTermChange(event) {
        let localTerm = this.state.term;
        localTerm.termStart = event.target.value;
        this.setState({term: localTerm});
    }

    handleEndTermChange(event) {
        let localTerm = this.state.term;
        localTerm.termEnd = event.target.value;
        this.setState({term: localTerm});
    }
    submit(){

        let currentComponent = this

        axios.post(Constants.baseUrl + "rest/chorechart/admin/termInformation", this.state.term).then(res => {
            this.props.edit(false)


        }).catch(function (error) {

            if (error.response.status === 401) {
                currentComponent.setState({error: true})
            }

        });

        alert("Submit")
    }

    render() {
        if (!this.state.loggedOn) {
            return <Redirect to={"/login"}/>
        }
        if (this.state.error){
            return <h1 style={{color:Constants.colorError}}>Error Please Try Again</h1>
        }
        // return (
        //     <div style={Constants.listRowStyle()} className={"editTerm"}>
        //         <p>{this.state.term.active ? "Active" : "Inactive"}</p>
        //         <input type={"number"} className={"login-input"}
        //                style={this.getPopulationInputStyle()} value={this.state.term.population}
        //                onChange={this.handlePopulationChange}/>
        //
        //         <input type={"date"} className={"login-input"}
        //                style={this.getPopulationInputStyle(true)} value={this.state.term.termStart}
        //                onChange={this.handleStartTermChange}/>
        //         <input type={"date"} className={"login-input"}
        //                style={this.getPopulationInputStyle(true)} value={this.state.term.termEnd}
        //                onChange={this.handleEndTermChange}/>
        //
        //         <i style={this.getIconStyle()} onMouseEnter={this.hover} onMouseLeave={this.hover} onClick={this.submit}
        //            className="material-icons">send</i>
        //
        //     </div>
        // )
    }

}

export default AddTermInfo