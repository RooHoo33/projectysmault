import React from "react";

import * as Constants from "../../constants/constants"
import axios from "axios";
import ChoreChartForm from "./ChoreChartForm";


class ChoreChartFormPanel extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            forms: [],
            formsLoaded: false,


        };

        // this.edit = this.edit.bind(this);
        //
        // this.submit = this.submit.bind(this);
        // this.handleNameUpdate = this.handleNameUpdate.bind(this);
        // this.cancelEdit = this.cancelEdit.bind(this);
        // this.deleteConfirmation = this.deleteConfirmation.bind(this);
    }

    componentDidMount() {

        axios.get(Constants.baseUrl + "rest/chorechart/admin/choreforms").then(res => {
            let jsonForms = res.data;
            console.log("Forsm for panel: " +jsonForms);

            this.setState({
                forms: jsonForms,
                formsLoaded: true
            });
        }).catch(function (error) {


        });

    }


    render() {

        let chores = this.props.chores;
        let days = this.props.days;

        if (!this.state.formsLoaded || chores.length===0 || days.length === 0) {
            return <div/>
        }

        console.log("props chores: " + this.props.chores)


        console.log("value chores: " + chores)

        return (
            <div className={"ChoreChartFormPanel"}>
                <h1 className={Constants.getHeadingStyleChoreChartAdmin()}>Chore Chart Forms</h1>
                <h2>Select Form</h2>
                {this.state.forms.map(form =>
                    <ChoreChartForm form={form}
                    chores={chores}
                    days={days}/>)}
            </div>
        )
    }
}

export default ChoreChartFormPanel
