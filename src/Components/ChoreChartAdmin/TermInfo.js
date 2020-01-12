import React from "react";

import * as Constants from "../../constants/constants"
import axios from "axios";
import DeleteEditSaveButtons from "../DeleteEditSaveButtons";


class TermInfo extends React.Component {

    constructor(props) {
        super(props);
        let localTerm = this.props.term;
        localTerm.originalTermStart = localTerm.termStart;
        localTerm.originalTermEnd = localTerm.termEnd;
        localTerm.originalPopulation = localTerm.population;
        this.state = {
            term: localTerm,
            delete: false,
            error: false,
        };

        this.edit = this.edit.bind(this);
        this.handlePopulationChange = this.handlePopulationChange.bind(this);
        this.handleStartTermChange = this.handleStartTermChange.bind(this);
        this.handleEndTermChange = this.handleEndTermChange.bind(this);
        this.submit = this.submit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.deleteConfirmation = this.deleteConfirmation.bind(this);
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

    edit() {
        let localTerm = this.state.term;
        localTerm.edit = true;
        localTerm.originalTermStart = localTerm.termStart;
        localTerm.originalTermEnd = localTerm.termEnd;
        localTerm.originalPopulation = localTerm.population;
        this.setState({term: localTerm})

    }

    // delete() {
    //     this.setState({delete: !this.state.delete})
    // }

    deleteConfirmation() {
        let currentComponent = this;
        axios.delete(Constants.baseUrl + "rest/chorechart/admin/terminformation?id=" + this.state.term.id).then(res => {

            currentComponent.props.deleteFun(this.state.term.id);
            currentComponent.setState({error: false});
        }).catch(function (error) {

            currentComponent.setState({error: true});
            currentComponent.setState({delete: false});
            // currentComponent.cancelEdit();

        });


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
                <div style={Constants.listRowStyle(false, this.state.error)} className={this.state.term.id}>

                    {this.state.error &&
                    <p style={{color: "black", width: "800px"}}>Error</p>


                    }
                    {!this.state.error &&
                    <p>{this.state.term.active ? "Active" : "Inactive"}</p>

                    }
                    <p>{this.props.term.population}</p>
                    <p>{(typeof this.state.term.termStart === 'string' || this.state.term.termStart instanceof String) ? this.props.term.termStart : this.props.term.termStart.toDateString()}</p>
                    <p>{(typeof this.state.term.termEnd === 'string' || this.state.term.termEnd instanceof String) ? this.props.term.termEnd : this.props.term.termEnd.toDateString()}</p>
                    <DeleteEditSaveButtons submitFun={this.submit} editValue={this.state.term.edit} editFun={this.edit}
                                           cancelEditFun={this.cancelEdit}
                                           deleteConfirmationFun={this.deleteConfirmation}/>
                </div>
            )

        } else {


            return (

                <div className={"editTermAndPossibleError"}>


                    <div style={Constants.listRowStyle(false, this.state.error)} className={"editTerm"}>
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

                        <DeleteEditSaveButtons submitFun={this.submit} editValue={this.state.term.edit}
                                               editFun={this.edit} cancelEditFun={this.cancelEdit}
                                               deleteConfirmationFun={this.deleteConfirmation}/>

                    </div>
                </div>
            )
        }

    }
}

export default TermInfo