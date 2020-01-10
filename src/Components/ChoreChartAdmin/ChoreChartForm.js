import React from "react";

import * as Constants from "../../constants/constants"
import axios from "axios";
import moment from "moment";
import Calendar from "./Calendar";
import autoBind from "auto-bind";


class ChoreChartForm extends React.Component {
    weekNumber;

    constructor(props) {
        super(props);


console.log("all Chores: " + (this.props.chores !== undefined && Array.isArray(this.props.chores) ));

        this.state = {
            form: this.props.form,
            extend: false,
            hover: false,
            allChores: this.props.chores,
            allDays: this.props.days,
            daysLoaded: false,
        choresLoaded: false,


        };


        autoBind(this)
        // this.edit = this.edit.bind(this);
        //
        // this.submit = this.submit.bind(this);
        // this.handleNameUpdate = this.handleNameUpdate.bind(this);
        // this.cancelEdit = this.cancelEdit.bind(this);
        // this.deleteConfirmation = this.deleteConfirmation.bind(this);
    }

    componentDidMount() {

        console.log("All Days: " + this.props.days);

        if (this.props.days !== undefined && Array.isArray(this.props.days) && this.props.days.length){
            this.setState({daysLoaded:true})
        } else {
            return
        }

        console.log("All Chores: " + this.props.chores);


        if (this.props.chores !== undefined && Array.isArray(this.props.chores) && this.props.chores.length){
            console.log("All Chores: " + this.props.chores);

            this.setState({choresLoaded:true})
        } else {
            return
        }


        // if (Array.isArray(this.state.allChores) && Array.isArray(this.state.allDays)){
        //     console.log("AllChores: " + this.state.allChores);
        //     console.log("AllDays: " + this.state.allDays)
        //     this.setState({loaded:true})
        //
        // } else {
        //     this.setState({loaded:false});
        //     return
        //
        // }

        let allChores = this.props.chores;
        let currentComponent = this
        allChores.forEach(function (chore) {
            currentComponent.state.form.chores.forEach(function (formChore) {
                if (formChore.id === chore.id){
                    chore.selected= true;
                }

            })

        });
        this.setState({allChores: allChores})

    }

    getChoresAndDayStyle() {
        return {
            display: "grid",
            gridTemplateColumns: "50% 50%",
        }
    }

    getFormStyle() {
        return {
            backgroundColor: Constants.colorInfo,
            padding: "10px",
            borderRadius: "15px",
            margin: "12px auto",

        }
    }

    getEachDayOrChoreStyle() {
        return {

        }
    }


    choreOrDayContainer() {
        return {
            // alignItems: "flex-end",
            // display:"flex"
        }
    }

    extendCollapseButtonStyle() {

        return ({
            float: "right",
            marginTop: "5px",
            transform: this.state.extend ? "" : "rotate(-90deg)",
            animationDuration: "40sec",
            cursor: this.state.hover ? "pointer" : "context-menu"
        })
    }


    extendOrCollapse(){
        this.setState({extend:!this.state.extend})
    }

    hovering() {
        this.setState({hover: true})
    }

    notHovering() {
        this.setState({hover: false})
    }
    collapsedDsiplay(beginingString, values){
        let returnString = beginingString;
        values.forEach(function (value) {
            returnString = returnString + value.name + ","
        });
        return returnString.slice(0,-1)
    }


    render() {

        if (!this.state.daysLoaded || !this.state.choresLoaded){
            return <div/>
        }
        return (
            <div className={"form-" + this.state.form.weekNumber} style={this.getFormStyle()}>

                <p style={this.extendCollapseButtonStyle()}
                   onMouseEnter={this.hovering}
                   onMouseLeave={this.notHovering}
                   onClick={this.extendOrCollapse}
                   className="material-icons">details</p>

                {this.state.form.weekNumber === "default" &&
                <h3>Default</h3>}

                {this.state.form.weekNumber !== "default" &&
                <h3 style={{borderBottomStyle: "solid", paddingBottom: "8px"}}><small>From</small> {moment(this.state.form.weekNumber).format(momentNiceFormat).toString() + " "}
                    <small>To</small> {moment(this.state.form.weekNumber).add(1, "week").format(momentNiceFormat).toString()}</h3>}




                <div style={this.getChoresAndDayStyle()} className={"choresAndDays-" + this.state.form.weekNumber}>
                    {!this.state.edit &&
                    <div style={this.choreOrDayContainer()} className={"days"}>
                        {!this.state.extend && <p style={overFlowTextStyle}>{this.collapsedDsiplay("Days: ", this.state.form.days)}</p>}
                        {this.state.extend &&
                        <div>
                            <h3 >Days</h3>
                            {this.state.form.days.map(day =>
                                <p style={this.getEachDayOrChoreStyle()}>{day.name}</p>)
                            }
                        </div>

                        }

                    </div>
                    }


                    {!this.state.edit &&
                    <div style={this.choreOrDayContainer()} className={"chores"}>
                        {!this.state.extend &&
                        <p style={overFlowTextStyle}>{this.collapsedDsiplay("Chores : ", this.state.form.chores)}</p>}
                        {this.state.extend &&
                        <div>
                            <h3>Chores</h3>
                            {this.state.form.chores.map(chore =>
                                <p style={this.getEachDayOrChoreStyle()}>{chore.name}</p>)
                            }
                        </div>
                        }

                        {/*<h3 style={this.getEachDayOrChoreStyle()}>Chores</h3>*/}
                        {/*{this.state.form.chores.map(chores =>*/}

                        {/*    <p style={this.getEachDayOrChoreStyle()}>{chores.name}</p>*/}
                        {/*)}*/}
                    </div>
                    }

                </div>


            </div>
        )
    }

}


const overFlowTextStyle = {width: "100%", whiteSpace: "nowrap", overflow: "hidden",textOverflow: "ellipsis"};
const momentNiceFormat = "dddd, MMM Do, YYYY";
// const momentExportHtmlFormat = "yyyy[-W]w";
export default ChoreChartForm