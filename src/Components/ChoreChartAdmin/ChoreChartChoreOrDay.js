import React from "react";

import * as Constants from "../../constants/constants"
import axios from "axios";
import DeleteEditSaveButtons from "../DeleteEditSaveButtons";


class ChoreChartChoreOrDay extends React.Component {
    choreName;

    constructor(props) {
        super(props);

        let localChoreOrDay = this.props.choreOrDay;
        if (this.props.choreOrDay.name){
            localChoreOrDay.originalName = this.props.choreOrDay.name;

        }
        this.state = {
            choreOrDay: localChoreOrDay,
            edit: this.props.edit,
            error: false,

        };

        this.edit = this.edit.bind(this);

        this.submit = this.submit.bind(this);
        this.handleNameUpdate = this.handleNameUpdate.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
        this.deleteConfirmation = this.deleteConfirmation.bind(this);
    }

    submit() {


        let currentComponent = this;
        let choreOrDay = {
            name: this.state.choreOrDay.name,
            id: this.state.choreOrDay.id,
        }

        axios.post(Constants.baseUrl + "rest/chorechart/admin/" + this.props.urlEnding, choreOrDay).then(res => {

            currentComponent.setState({edit: false});
            currentComponent.setState({error: false});
            if (this.props.edit){
                currentComponent.setState({
                    choreOrDay: {}

                })
                console.log(res.data)
                currentComponent.props.addChoreOrDay(res.data)

            }



                }).catch(function (error) {

            currentComponent.setState({error: true})

        });



    }

    edit() {
        this.setState({edit: !this.state.edit})
    }

    cancelEdit(){
        let localChore = this.state.choreOrDay;
        localChore.name = localChore.originalName;
        this.setState({choreOrDay:localChore});
        this.setState({edit: !this.state.edit})
    }

    handleNameUpdate(event) {
        let localChore = this.state.choreOrDay;
        localChore.name = event.target.value;
        this.setState({choreOrDay: localChore});
    }

    deleteConfirmation() {
        console.log("hereherer")
        let currentComponent = this;
        axios.delete(Constants.baseUrl + "rest/chorechart/admin/chorechore?id=" + currentComponent.state.choreOrDay.id).then(res => {

            console.log("Good job")
            currentComponent.props.deleteFun(this.state.choreOrDay.id);
            currentComponent.setState({error: false});
        }).catch(function (error) {
            console.log("error right here")
            console.log(error)
            currentComponent.setState({error: true});
            currentComponent.setState({delete: false});
            // currentComponent.cancelEdit();

        });


    }


    render() {

        let deleteConfirmation = this.deleteConfirmation;
        let submitFun = this.submit;

        if (!this.state.edit) {
            return (
                <div style={Constants.choresAndDaysGridStyle(false, this.state.error, this.props.chore)} className={this.state.choreOrDay.id}>
                    <p>{this.state.choreOrDay.name}</p>
                    <DeleteEditSaveButtons submitFun={submitFun} cancelEditFun={this.cancelEdit} deleteConfirmationFun={deleteConfirmation} editFun={this.edit} editValue={this.state.edit}/>

                </div>
            )
        } else {
            return (
                <div className={this.state.choreOrDay.id} style={Constants.choresAndDaysGridStyle(false, this.state.error, this.props.chore)}>
                    <input type={"text"} className={"login-input"}
                           style={Constants.choreAndDayInputStyle()} value={this.state.choreOrDay.name}
                           onChange={this.handleNameUpdate}/>
                    <DeleteEditSaveButtons submitFun={submitFun} cancelEditFun={this.cancelEdit} deleteConfirmationFun={deleteConfirmation} editFun={this.edit} editValue={this.state.edit}/>
                </div>
            )
        }
    }

}

export default ChoreChartChoreOrDay