import React from "react";
import axios from "axios";
import * as Constants from "../constants/constants"

import {Redirect} from "react-router-dom";
import TermInfo from "./ChoreChartAdmin/TermInfo";
import AddTermInfo from "./ChoreChartAdmin/AddTermInfo";
import ChoreChartDay from "./ChoreChartAdmin/ChoreChartDay";
import AddChoreChartChore from "./ChoreChartAdmin/AddChoreChartChore";
import ChoreChartChore from "./ChoreChartAdmin/ChoreChartChore";


class ChoreChartAdmin extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            loggedOn: true,
            days: [],
            chores: [],
            termInfos: [],
            editATerm: false,
            term: {},
        };
        this.editATerm = this.editATerm.bind(this);
        this.deleteTermInformation = this.deleteTermInformation.bind(this)
    }

    editATerm(edit, termToEdit = {}) {
        this.setState({editATerm: edit});
        this.setState({term: termToEdit});

    }

    getTermInfoHeader() {
        return (
            <div style={Constants.listRowStyle(true)} className={"termInfoHeader"}>

                <p>Active</p>
                <p>Workers</p>
                <p>Start of Term</p>
                <p>End of Term</p>
                <p style={{textAlign: "center",}}>Edit</p>
            </div>
        )
    }


    handleErrors(error, currentComponent) {
        if (error.response) {
            if (error.response.status === 401) {
                currentComponent.setState({loggedOn: false});
            } else {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }

        }
    }

    getTermInfoGroupStyle() {
        return {
            background: Constants.backgroundSecondaryColor,
            width: "850px",
            margin: "0 auto 30px auto",
            borderRadius: "20px",
            padding: "30px",
            display: "block"
        }
    }

    getHeadingsStyles() {
        return {
            textIndent: "45px",
            textAlign: "left", color: "black"
        }
    }

    getChoresAndDaysGridStyle() {
        return {
            display: "grid",
            gridTemplateColumns: "50% 50%",
        }
    }

    deleteTermInformation(termId){
        let terms = this.state.termInfos;
        terms.forEach(function (term){
            if (term.id === termId){
                term.deleted = true;
            }
        });
        this.setState({terms: terms})
    }

    componentDidMount() {

        let currentComponent = this;

        axios.get(Constants.baseUrl + "rest/chorechart/admin/choredays").then(res => {
            const jsonDays = res.data;
            jsonDays.map(day =>
                day.deleted = false);
            this.setState({days: jsonDays});
        }).catch(function (error) {
            currentComponent.handleErrors(error, currentComponent)
        });

        axios.get(Constants.baseUrl + "rest/chorechart/admin/chorechores").then(res => {
            const jsonChores = res.data;
            jsonChores.map(chore =>
                chore.deleted = false);
            this.setState({chores: jsonChores});
        }).catch(function (error) {
            currentComponent.handleErrors(error, currentComponent)
        });

        axios.get(Constants.baseUrl + "rest/chorechart/admin/terminformations").then(res => {
            const jsonTermInfos = res.data;
            console.log(jsonTermInfos);
            jsonTermInfos.map(it =>
                it.termStart = new Date(it.termStart[0], it.termStart[1] - 1, it.termStart[2])
            );

            jsonTermInfos.map(termInfo =>
                termInfo.deleted = false);

            jsonTermInfos.map(it => it.edit = false);

            jsonTermInfos.map(it =>
                it.termEnd = new Date(it.termEnd[0], it.termEnd[1] - 1, it.termEnd[2])
            );

            this.setState({termInfos: jsonTermInfos});
        }).catch(function (error) {
            currentComponent.handleErrors(error, currentComponent)
        });
    }

    render() {

        if (!this.state.loggedOn) {
            return <Redirect to={"/login"}/>
        }
        let termInfoDelete = this.deleteTermInformation;
        return (


            <div className={"ChoreChartAdmin"}>

                <div style={this.getTermInfoGroupStyle()} className={"termInfos"}>
                    <h1 style={this.getHeadingsStyles()}>Term Information</h1>
                    {this.getTermInfoHeader()}

                    {/*{this.state.editATerm &&*/}
                    {/*<AddTermInfo term={this.state.term} edit={this.editATerm}/>}*/}

                    {/* eslint-disable-next-line array-callback-return */}
                    {this.state.termInfos.map(function (termInfo) {
                            if (!termInfo.deleted) {
                                return <TermInfo term={termInfo} deleteFun={termInfoDelete}/>

                            }
                        }
                    )}
                </div>

                <div style={this.getTermInfoGroupStyle()} className={"DaysAndChores"}>
                    <h1 style={this.getHeadingsStyles()}>Chores And Days</h1>
                    <div style={this.getChoresAndDaysGridStyle()} className={"daysAndChoresGrid"}>

                        <div className={"choreChartChores"}>
                            {this.state.chores.map(chore =>


                                <ChoreChartChore chore={chore} editTerm={this.editATerm}/>
                            )}
                        </div>
                        <div className={"choreChartDays"}>
                            {this.state.days.map(day =>


                                <ChoreChartChore day={day} editTerm={this.editATerm}/>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default ChoreChartAdmin