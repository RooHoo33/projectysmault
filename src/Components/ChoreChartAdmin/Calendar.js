import React from "react";

import * as Constants from "../../constants/constants"
import axios from "axios";
import moment from "moment";

class Calendar extends React.Component{

    constructor(props) {
        super(props);

        let currentDate = moment()


        this.state = {
            displayMonth: moment().month(),
            currentDate:currentDate,
        };

        this.assebleCalendar= this.assebleCalendar.bind(this)

        // this.edit = this.edit.bind(this);
        //
        // this.submit = this.submit.bind(this);
        // this.handleNameUpdate = this.handleNameUpdate.bind(this);
        // this.cancelEdit = this.cancelEdit.bind(this);
        // this.deleteConfirmation = this.deleteConfirmation.bind(this);
    }

    assebleCalendar(){

        moment()
    }



    componentDidMount() {

        this.assebleCalendar()

    }

    render() {
        return (
            <div className={"calendar"}>

                <p>{this.state.displayMonth}</p>
            </div>
        )
    }

}

export default Calendar