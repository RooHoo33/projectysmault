import React from "react";

import * as Constants from "../../constants/constants"
import axios from "axios";


class TermInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            term: this.props.term
        }

        this.edit = this.edit.bind(this);
        this.hover = this.hover.bind(this);
        this.handlePopulationChange = this.handlePopulationChange.bind(this);
        this.handleStartTermChange = this.handleStartTermChange.bind(this);
        this.handleEndTermChange = this.handleEndTermChange.bind(this);
        this.submit = this.submit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this)
    }

    getPopulationInputStyle(date = false) {
        return {
            backgroundColor: "#282c34",
            border: "0",
            // height: "100%",
            width: date ? "90%" : "40%",
            fontSize: "16px",
            // padding: "20px 0",
            margin: "5px 8px",
            borderRadius: "5px",
            borderWidth: "1px",
            textIndent: "5px"
        }
    }

    getIconStyle(color = "black") {
        return {
            color: color,
            margin: "auto auto",
            fontSize: "28px",
            letterSpacing: "8px",
            textAlign: "center",
            cursor: this.state.hover ? "pointer" : "context-menu"
        }
    }

    hover() {
        this.setState({hover: !this.state.hover});
    }

    edit() {
        let localTerm = this.state.term;
        localTerm.edit = true;
        localTerm.originalTermStart = localTerm.termStart;
        localTerm.originalTermEnd = localTerm.termEnd;
        localTerm.originalPopulation = localTerm.population;
        this.setState({term: localTerm})

    }

    cancelEdit() {

        let localTerm = this.state.term;
        localTerm.termStart = localTerm.originalTermStart;
        localTerm.termEnd = localTerm.originalTermEnd;
        localTerm.population = localTerm.originalPopulation;

        localTerm.edit = false;
        this.setState({term: localTerm})
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

    submit() {

        let currentComponent = this

        axios.post(Constants.baseUrl + "rest/chorechart/admin/termInformation", this.state.term).then(res => {
            let localTerm = currentComponent.state.term;
            localTerm.edit = false;
            currentComponent.setState({term: localTerm});
            currentComponent.setState({error: false});


        }).catch(function (error) {

            currentComponent.setState({error: true})

        });

    }


    getErrorMessage() {
        return <h1 style={{color: Constants.colorError}}>Error</h1>
    }


    render() {


        if (!this.state.term.edit) {

            return (
                <div style={Constants.listRowStyle()} className={this.props.term.id}>

                    <p>{this.props.term.active ? "Active" : "Inactive"}</p>
                    <p>{this.props.term.population}</p>
                    <p>{(typeof this.props.term.termStart === 'string' || this.props.term.termStart instanceof String) ? this.props.term.termStart : this.props.term.termStart.toDateString()}</p>
                    <p>{(typeof this.props.term.termEnd === 'string' || this.props.term.termEnd instanceof String) ? this.props.term.termEnd : this.props.term.termEnd.toDateString()}</p>
                    <p style={this.getIconStyle()} onMouseEnter={this.hover} onMouseLeave={this.hover}
                       onClick={this.edit} className="material-icons">edit</p>
                </div>
            )

        } else {

            let editTermStyle = Constants.listRowStyle()

            if (this.state.error) {
                editTermStyle.backgroundColor = Constants.colorError
            }
            return (

                <div className={"editTermAndPossibleError"}>


                    <div style={editTermStyle} className={"editTerm"}>
                        {this.state.error &&
                        <p style={{color: "black", width: "800px"}}>Error</p>


                        }
                        {!this.state.error &&
                        <p>{this.state.term.active ? "Active" : "Inactive"}</p>

                        }

                        {/*<p>{this.state.term.active ? "Active" : "Inactive"}</p>*/}
                        <input type={"number"} className={"login-input"}
                               style={this.getPopulationInputStyle()} value={this.state.term.population}
                               onChange={this.handlePopulationChange}/>

                        <input type={"date"} className={"login-input"}
                               style={this.getPopulationInputStyle(true)} value={this.state.term.termStart}
                               onChange={this.handleStartTermChange}/>
                        <input type={"date"} className={"login-input"}
                               style={this.getPopulationInputStyle(true)} value={this.state.term.termEnd}
                               onChange={this.handleEndTermChange}/>

                        {/*<i style={this.getIconStyle()} onMouseEnter={this.hover} onMouseLeave={this.hover}*/}
                        {/*   onClick={this.submit}*/}
                        {/*   className="material-icons">send</i>*/}
                        <div style={{margin:"auto"}} className={"editThing"}>
                            <p style={this.getIconStyle(Constants.colorSuccess)} onMouseEnter={this.hover} onMouseLeave={this.hover}
                               onClick={this.submit}
                               className="material-icons">send</p>
                            <p style={this.getIconStyle(Constants.colorSecondary)} onMouseEnter={this.hover} onMouseLeave={this.hover}
                               onClick={this.cancelEdit}
                               className="material-icons">cancel</p>
                        </div>

                    </div>
                </div>
            )
        }

    }
}

export default TermInfo