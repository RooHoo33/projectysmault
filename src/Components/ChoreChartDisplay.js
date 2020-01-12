import React from "react";
import axios from "axios";
import * as Constants from "../constants/constants";
import autoBind from "auto-bind";
import decode from "jwt-decode";

class ChoreChartDisplay extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userPrefs: this.props.userPrefs,
            error: false,
            loadedFrom: false,
            hover: false,
            identicalPreferences: false,
            choreFormsLoaded: false,
            week:"",
            choreChartExits: false,

        };
        autoBind(this)
    }


    componentDidMount() {

        const decoded = decode(document.cookie.replace(/(?:(?:^|.*;\s*)jwttoken\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
        this.setState({chairmen: decoded.matComChairmen});

        axios.get(Constants.baseUrl + "rest/chorechart/chorechart").then(res => {
            const choresDaysAndUsers = res.data;

            // if (jsonForms.length !== 1) {
            //     this.setState({error: true});l
            //     return
            // }
            let form = {}


            choresDaysAndUsers.forEach(function (choreDayUser) {

                if (choreDayUser.choreDay.id in form) {
                    form[choreDayUser.choreDay.id].chores.push({
                        chore: choreDayUser.choreChore,
                        user: choreDayUser.siteUser,
                    })
                } else {
                    form[choreDayUser.choreDay.id] = {
                        day: choreDayUser.choreDay,
                        chores: [{
                            chore: choreDayUser.choreChore,
                            user: choreDayUser.siteUser,
                        }]
                    }


                }
            })

            let key = Object.keys(form)[0];

            let chores = [];

            if (Object.entries(form).length === 0 && form.constructor === Object){
                this.setState({choreFormsLoaded:true})
                console.log("WE ARE DOING IT")
                return
            }
            form[key].chores.forEach(function (choreAndUser) {
                chores.push(choreAndUser.chore.name)
            })

            this.setState({
                choreForm: form,
                choreFormsLoaded: true,
                chores: chores,
                numberOfDays: Object.keys(form).length,
                choreChartExits: true

            })

        }).catch(function (error) {
            console.log(error)
            // currentComponent.setState({loggedOn: false})
        })


    }

    getDayStyle() {

        let i = 0
        let gridTemplateColumnsProperty = "15%";

        while (this.state.numberOfDays > i) {
            gridTemplateColumnsProperty = gridTemplateColumnsProperty + " " + (85 / this.state.numberOfDays).toString() + "%";
            i = i + 1

        }
        return {
            display: "grid",
            gridTemplateColumns: gridTemplateColumnsProperty,
            margin: "0 10px",
            backgroundColor: this.state.error ? Constants.colorError : Constants.colorSecondary,
            padding: "15px",
            borderRadius: "5px",
        }
    }


    getCellStyles(choreName = false, nobody = false) {
        return {
            padding: "10px 0",
            height: "30px",
            borderRight: choreName ? "2px solid" : "none",
            margin: "0",
            textIndent: choreName ? "0" : "10px",
            color: nobody ? "white" : "black",
            fontWeight: nobody? "bold" : "normal"
        }
    }

    createChoreChartButtonsStyle(){
        return {
            textIndent: "6px",
            padding: "10px 6px",
            marginLeft:"10px",
            backgroundColor: Constants.colorPrimary,
            width:"230px",
            borderRadius:"10px"
        }
    }

    handleCreateChoreChart(){
        if (this.state.week === ""){
            console.log("no week");
            return
        }

        console.log(this.state.week)
        let currentComp = this

        let data = {
            week: this.state.week,
            kappaSigmaOrder: true
        }

        axios.post(Constants.baseUrl + "rest/chorechart/admin/createchorechart", data).then(res => {
            currentComp.setState({week: ""})

        }).catch(function (error) {
            console.log(error)
            currentComp.setState({error: true})
        })

    }

    handleCreateReverse(){
        if (this.state.week === ""){
            console.log("no week");
            return
        }

        console.log(this.state.week)
        let currentComp = this

        let data = {
            week: this.state.week,
            kappaSigmaOrder: false
        }

        axios.post(Constants.baseUrl + "rest/chorechart/admin/createchorechart", data).then(res => {
            currentComp.setState({week: ""})

        }).catch(function (error) {
            console.log(error)
            currentComp.setState({error: true})
        })

    }

    handlWeekUpdate(event){

        this.setState({week: event.target.value})

    }
    weekStyle(){
        return {
            backgroundColor: Constants.backgroundSecondaryColor,
            borderColor:Constants.colorPrimary,
            borderWidth:"2px",
            borderRadius: "4px",
            marginLeft:"10px"
        }
    }



    render() {

        if (!this.state.choreFormsLoaded) {
            return <div/>
        }

        return (
            <div style={{
                padding: "60px",
                backgroundColor: Constants.backgroundSecondaryColor,
                margin: "20px 10%",
                borderRadius: "10px",
            }} className={"chorechartdisplayParent"}>
                <h1 style={{textIndent: "10px"}}>Chore Chart</h1>
                {this.state.chairmen && <div>

                    <p>Week:  </p>
                    <input type={"week"} className={"login-input"}
                           style={this.weekStyle()}
                           onChange={this.handlWeekUpdate}/>
                    <p style={this.createChoreChartButtonsStyle()}
                       onClick={this.handleCreateChoreChart}>Create &#922;&#931; order Chore Chart</p>
                    <p style={this.createChoreChartButtonsStyle()}
                       onClick={this.handleCreateReverse}> Create Reverse &#922;&#931; Chore Chart</p>
                </div>}

                {!this.state.choreChartExits && <h3>No Chores Exist for this week yet</h3>
                }
                {this.state.choreChartExits &&
                <div style={this.getDayStyle()} className={"choreChartDisplay"}>


                    <div className={"chores"}>

                        <p style={{margin: "0", paddingBottom: "5px"}}>Chores</p>
                        {this.state.chores.map(chore => {
                            return <p style={this.getCellStyles(true)}>{chore}</p>
                        })}
                    </div>
                    {Object.keys(this.state.choreForm).map(dayAndChoresKey => {
                        return <div>
                            <p style={{
                                borderBottom: "2px solid",
                                margin: "0",
                                paddingBottom: "5px"
                            }}>{this.state.choreForm[dayAndChoresKey].day.name}</p>
                            {this.state.choreForm[dayAndChoresKey].chores.map(chore => {
                                return <div className={"userName"}>
                                    {chore.user.kappaSigma === 0 &&
                                    <p style={this.getCellStyles(false, true)}>{chore.user.firstName}</p>}
                                    {(chore.user.kappaSigma === 99999) &&
                                    <p style={this.getCellStyles()}>{chore.user.firstName + " " + chore.user.lastName}</p>
                                    }

                                    {(chore.user.kappaSigma !== 0 && chore.user.kappaSigma !== 99999) &&
                                    <p style={this.getCellStyles()}>&#922;&#931; {" " + chore.user.kappaSigma}</p>
                                    }
                                </div>
                            })}
                        </div>

                    })
                    }


                </div>
                }
            </div>
        )
    }

}

export default ChoreChartDisplay