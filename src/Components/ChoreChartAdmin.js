import React from "react";
import axios from "axios";
import * as Constants from "../constants/constants"

import {Redirect} from "react-router-dom";
import TermInfo from "./ChoreChartAdmin/TermInfo";
import AddTermInfo from "./ChoreChartAdmin/AddTermInfo";
import ChoreChartChoreOrDay from "./ChoreChartAdmin/ChoreChartChoreOrDay";


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
            choresLoaded: false,
            daysLoaded: false,
            termInfosLoaded: false,
            editAChore: false,
            editADay: false,
            hover:false,
        };
        this.deleteTermInformation = this.deleteTermInformation.bind(this);
        this.deleteChoreInformation = this.deleteChoreInformation.bind(this);
        this.deleteDayInformation = this.deleteDayInformation.bind(this);
        this.addTerm = this.addTerm.bind(this);
        this.addChore = this.addChore.bind(this);
        this.addDay = this.addDay.bind(this);

        this.editATermFun = this.editATermFun.bind(this)
        this.editAChoreFun= this.editAChoreFun.bind(this);
        this.editADayFun = this.editADayFun.bind(this);
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
        console.log("errorhere");
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

    deleteTermInformation(termId) {
        let terms = this.state.termInfos;
        terms.forEach(function (term) {
            if (term.id === termId) {
                term.deleted = true;
            }
        });
        this.setState({terms: terms})
    }

    deleteChoreInformation(choreId) {
        let chores = this.state.chores;
        chores.forEach(function (chore) {
            if (chore.id === choreId) {
                chore.deleted = true;
            }
        });
        this.setState({chores: chores})
    }

    deleteDayInformation(dayId) {
        let days = this.state.days;
        days.forEach(function (day) {
            if (day.id === dayId) {
                day.deleted = true;
            }
        });
        this.setState({days: days})
    }

    componentDidMount() {

        let currentComponent = this;


        axios.get(Constants.baseUrl + "rest/chorechart/admin/choredays").then(res => {
            const jsonDays = res.data;
            jsonDays.map(it => it.edit = false);
            jsonDays.map(day =>
                day.deleted = false);
            let daysObject = {
                choresOrDays: jsonDays,
                type: "day",
                singleUrl: "chorechore",
                listUrl: "chorechores"
            }
            this.setState({
                days: jsonDays,
                daysLoaded: true,
                hover: false,
            });

            this.hovering = this.hovering.bind(this);
            this.notHovering = this.notHovering.bind(this);

        }).catch(function (error) {
            currentComponent.handleErrors(error, currentComponent)
        });

        axios.get(Constants.baseUrl + "rest/chorechart/admin/chorechores").then(res => {
            const jsonChores = res.data;

            jsonChores.map(chore =>
                chore.deleted = false);
            jsonChores.map(it => it.edit = false);
            let choresObject = {
                choresOrDays: jsonChores,
                type: "chore",
                singleUrl: "choreday",
                listUrl: "choredays"
            };
            this.setState({
                chores: jsonChores,
                choresLoaded: true
            });
        }).catch(function (error) {
            currentComponent.handleErrors(error, currentComponent)
        });

        axios.get(Constants.baseUrl + "rest/chorechart/admin/terminformations").then(res => {
            let jsonTermInfos = res.data;
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

            this.setState({
                termInfos: jsonTermInfos,
                termInfosLoaded: true
            });
        }).catch(function (error) {
            currentComponent.handleErrors(error, currentComponent)
        });
        this.setState({
            loaded: true,
        });

    }

    hovering() {
        this.setState({hover: true});
    }

    notHovering() {
        this.setState({hover: false});
    }

    addTerm(term) {
        let termInfomarions = this.state.termInfos;
        termInfomarions.push(term);
        console.log(termInfomarions)
        this.setState({termInfos: termInfomarions, editATerm: false});
    }

    editATermFun() {
        this.setState({editATerm: !this.state.editATerm});
    }

    editADayFun() {
        this.setState({editADay: !this.state.editADay});
    }

    editAChoreFun() {
        this.setState({editAChore: !this.state.editAChore});
    }

    addChore(chore){
        let chores = this.state.chores;
        chores.push(chore)
        this.setState({chores:chores, editAChore:false})
    }

    addDay(day){
        let days = this.state.days;
        days.push(day)
        this.setState({days:days, editADay:false})
    }

    render() {
        console.log(!this.state.termInfos && !this.state.choresLoaded && !this.state.daysLoaded)

        if (!this.state.termInfos && !this.state.choresLoaded && !this.state.daysLoaded) {
            return <div/>
        }

        const {days, chores, termInfos} = this.state;
        if (!this.state.loggedOn) {
            return <Redirect to={"/login"}/>
        }
        let termInfoDelete = this.deleteTermInformation;
        let deleteChoreInformation = this.deleteChoreInformation;
        let deleteDayInformation = this.deleteDayInformation;
        return (


            <div className={"ChoreChartAdmin"}>

                <div style={this.getTermInfoGroupStyle()} className={"termInfos"}>
                    <div style={this.getHeadingsStyles()} className={"termInfosHeader"}>
                        <h1 style={{float: "left"}}>Term Information</h1>
                        <p style={{
                            float: "right",
                            marginRight: "40px",
                            cursor: this.state.hover ? "pointer" : "context-menu"
                        }} className="material-icons" onClick={this.editATermFun} onMouseEnter={this.hovering}
                           onMouseLeave={this.notHovering}>note_add</p>

                    </div>

                    {this.getTermInfoHeader()}

                    {/* eslint-disable-next-line array-callback-return */}
                    <AddTermInfo addTermFun={this.addTerm} edit={this.state.editATerm}/>
                    {termInfos.map(function (termInfo) {
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

                            <div style={this.getHeadingsStyles()} className={"termInfosHeader"}>
                                <h1 style={{float: "left", fontSize: "22px"}}>Chores</h1>
                                <p style={{float:"right", marginRight:"40px",fontSize:"22px",cursor: this.state.hover ? "pointer" : "context-menu"}} onClick={this.editAChoreFun} className="material-icons" onMouseEnter={this.hovering} onMouseLeave={this.notHovering}>note_add</p>

                            </div>
                            {
                                this.state.editAChore &&
                                <ChoreChartChoreOrDay chore={true} addChoreOrDay={this.addChore} urlEnding={"chorechore"} deleteFun={deleteChoreInformation} edit={true} choreOrDay={{}}/>

                                }



                            {chores.map(function (chore) {
                                    if (!chore.deleted) {
                                        return <ChoreChartChoreOrDay chore={true} urlEnding={"chorechore"} edit={false} deleteFun={deleteChoreInformation} choreOrDay={chore}/>
                                    }
                                }
                            )}


                        </div>

                        < div className={"choreChartDays"}>
                            <div style={this.getHeadingsStyles()} className={"termInfosHeader"}>
                                <h1 style={{float: "left", fontSize: "22px"}}>Days</h1>
                                <p style={{float:"right", marginRight:"40px",fontSize:"22px",cursor: this.state.hover ? "pointer" : "context-menu"}} onClick={this.editADayFun} className="material-icons" onMouseEnter={this.hovering} onMouseLeave={this.notHovering}>note_add</p>

                            </div>
                            {
                                this.state.editADay &&
                                <ChoreChartChoreOrDay chore={false} addChoreOrDay={this.addDay} urlEnding={"choreday"} deleteFun={deleteDayInformation} edit={true} choreOrDay={{}}/>

                            }



                            {days.map(function (day) {
                                    if (!day.deleted) {
                                        return <ChoreChartChoreOrDay chore={false} urlEnding={"choreday"} edit={false} deleteFun={deleteDayInformation} choreOrDay={day}/>
                                    }
                                }
                            )}


                        </div>

                    </div>
                </div>
            </div>
        )
    }
}


export default ChoreChartAdmin