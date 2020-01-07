import React from "react";
import autoBind from "auto-bind";
import * as Constants from "../../constants/constants";
import moment from "moment";

class ChoreChartFormInput extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            form: this.props.form,
            extend: false,
            hover: false


        };


        autoBind(this)

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

    render() {
        return (
            <div className={"choreChartFormInput"}>

                <h3 style={{borderBottomStyle: "solid", paddingBottom: "8px"}}>
                    <small>From</small> {moment(this.state.form.weekNumber).format(momentNiceFormat).toString() + " "}
                    <small>To</small> {moment(this.state.form.weekNumber).add(1, "week").format(momentNiceFormat).toString()}
                </h3>

                <div style={this.getChoresAndDayStyle()} className={"choresAndDays-" + this.state.form.weekNumber}>
                    <div style={this.choreOrDayContainer()} className={"days"}>
                        {!this.state.extend &&
                        <p style={overFlowTextStyle}>{this.collapsedDsiplay("Days: ", this.state.form.days)}</p>}
                        {this.state.extend &&
                        <div>
                            <h3>Days</h3>
                            {this.state.form.days.map(day =>
                                <p style={this.getEachDayOrChoreStyle()}>{day.name}</p>)
                            }
                        </div>

                        }

                    </div>

                    <div style={this.choreOrDayContainer()} className={"chores"}>


                        <h3>Chores</h3>
                        {this.state.form.chores.map(chore =>
                            <p style={this.getEachDayOrChoreStyle()}>{chore.name}</p>)

                        }
                    </div>
                </div>

            </div>
        );
    }
}
