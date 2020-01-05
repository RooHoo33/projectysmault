import React from "react";

import * as Constants from "../../constants/constants"
import {Redirect} from "react-router-dom";

import axios from "axios";


class AddTermInfo extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedOn: true,
            population: 0,
            termEnd: "",
            termStart: "",
            // term: this.props.term,
            error: false,
            edit: this.props.edit,

        };
        this.hover = this.hover.bind(this);
        this.handlePopulationChange = this.handlePopulationChange.bind(this);
        this.handleStartTermChange = this.handleStartTermChange.bind(this);
        this.handleEndTermChange = this.handleEndTermChange.bind(this);
        this.submit = this.submit.bind(this);

    }

    getIconStyle() {
        return {
            color: Constants.colorSuccess,
            textAlign:"right",
            marginTop: "11px",
            marginRight: "20px",
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
            margin: "5px " + (date ? "8px" : "18px"),
            borderRadius: "5px",
            borderWidth: "1px",
            textIndent: "5px"
        }
    }

    hover() {
        this.setState({hover: !this.state.hover});
    }

    handlePopulationChange(event) {
        this.setState({population: parseInt(event.target.value, 10)});
    }

    handleStartTermChange(event) {
        this.setState({termStart: event.target.value});
    }

    handleEndTermChange(event) {
        this.setState({termEnd: event.target.value});
    }

    submit() {

        let currentComponent = this
        let termInfo = {}
        termInfo.termEnd = this.state.termEnd;
        termInfo.termStart = this.state.termStart;
        termInfo.population = this.state.population;
        termInfo.active = false;

        axios.post(Constants.baseUrl + "rest/chorechart/admin/terminformation", termInfo).then(res => {

            let termInfo = res.data;

            termInfo.deleted = false;
            termInfo.edit = false;

            termInfo.termStart = new Date(termInfo.termStart[0], termInfo.termStart[1] - 1, termInfo.termStart[2]);
            termInfo.termEnd = new Date(termInfo.termEnd[0], termInfo.termEnd[1] - 1, termInfo.termEnd[2]);

            this.props.addTermFun(res.data);
            this.setState({
                edit: false,
                population: 0,
                termEnd: "",
                termStart: "",
            })


        }).catch(function (error) {

            currentComponent.setState({error: true})

        });

    }

    render() {
        if (!this.props.edit) {
            return <div/>
        }
        if (!this.state.loggedOn) {
            return <Redirect to={"/login"}/>
        }
        if (this.state.error) {
            return <h1 style={{color: Constants.colorError}}>Error Please Try Again</h1>
        }
        return (
            <div style={Constants.listRowStyle()} className={"editTerm"}>
                <p>Inactive</p>
                <input type={"number"} className={"login-input"}
                       style={this.getPopulationInputStyle()}
                       onChange={this.handlePopulationChange}/>

                <input type={"date"} className={"login-input"}
                       style={this.getPopulationInputStyle(true)}
                       onChange={this.handleStartTermChange}/>
                <input type={"date"} className={"login-input"}
                       style={this.getPopulationInputStyle(true)}
                       onChange={this.handleEndTermChange}/>

                <i style={this.getIconStyle()} onMouseEnter={this.hover} onMouseLeave={this.hover} onClick={this.submit}
                   className="material-icons">send</i>

            </div>
        )
    }

}

export default AddTermInfo