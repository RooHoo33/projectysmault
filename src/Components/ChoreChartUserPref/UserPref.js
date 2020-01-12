import React from "react";
import autoBind from "auto-bind";
import axios from "axios";
import decode from "jwt-decode";
import * as Constants from "../../constants/constants";
import UserPrefDayAndChoreSelector from "./UserPrefDayAndChoreSelector";
import {backgroundSecondaryColor} from "../../constants/constants";

class UserPref extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userPrefs: this.props.userPrefs,
            error: false,
            loadedFrom: false,
            hover: false,
            identicalPreferences: false,

        };
        autoBind(this)
    }

    updatePref(choreId, dayId, preference) {

        let localUserPrefs = this.state.userPrefs;
        let exists = false;

        localUserPrefs.forEach(function (localUserPref) {
            if (localUserPref.choreId === choreId && localUserPref.day_id === dayId) {
                localUserPref.preferenceRanking = preference;
                exists = true;
            }

        })

        if (!exists) {
            localUserPrefs.push({
                userId: decode(document.cookie.replace(/(?:(?:^|.*;\s*)jwttoken\s*\=\s*([^;]*).*$)|^.*$/, "$1")).userId,
                choreId: choreId,
                day_id: dayId,
                preferenceRanking: preference,
                week: this.props.week,
            })
        }

        this.setState({userPrefs: localUserPrefs})
    }

    componentDidMount() {

        axios.get(Constants.baseUrl + "rest/chorechart/admin/choreforms/week?week=" + this.props.week).then(res => {
            const jsonForm = res.data;

            // if (jsonForms.length !== 1) {
            //     this.setState({error: true});
            //     return
            // }
            let form = {}


            jsonForm.days.forEach(function (day) {
                let chores = {};
                jsonForm.chores.forEach(function (chore) {
                    chores[chore.id] = {chore: chore, day: day, preference: 0}

                });
                form[day.id] = chores
            });

            this.state.userPrefs.forEach(function (userPref) {
                form[userPref.day_id][userPref.choreId].preference = userPref.preferenceRanking

            })
            let dayById = {};

            jsonForm.days.forEach(function (day) {
                dayById[day.id] = day.name
            });

            this.setState({
                form: form, loadedForm: true,
                numberOfChores: jsonForm.chores.length,
                numberOfDays: jsonForm.days.length,
                formChores: jsonForm.chores,
                dayById: dayById
            });

        }).catch(function (error) {
            // currentComponent.setState({loggedOn: false})
        });


    }

    updateAllUserPrefs() {
        let currentComponent = this;
        let identicalPreference = false;

        this.state.userPrefs.forEach(function (userPref) {
            currentComponent.state.userPrefs.forEach(function (userPrefCompare) {

                if (userPref.preferenceRanking !== 0 && (userPref.preferenceRanking === userPrefCompare.preferenceRanking && !(userPref.choreId === userPrefCompare.choreId && userPref.day_id === userPrefCompare.day_id))) {

                    identicalPreference = true;
                }

            })


        });
        if (identicalPreference) {
            currentComponent.setState({identicalPreferences: true});
            return
        }
        axios.post(Constants.baseUrl + "rest/chorechart/userprefs/saveall", this.state.userPrefs).then(res => {

            window.location.reload();


        }).catch(function (error) {

            currentComponent.setState({error: true})

        });
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
            backgroundColor: this.state.error ? Constants.colorError : Constants.colorPrimary,
            padding: "15px",
            borderRadius: "10%",
        }
    }

    hovering() {
        this.setState({hover: true});
    }

    notHovering() {
        this.setState({hover: false});
    }

    render() {
        this.getDayStyle();
        if (!this.state.loadedForm) {
            return <div/>
        }

        let keys = Object.keys(this.state.form)
        return (
            <div style={{
                backgroundColor: this.state.error ? Constants.colorError : Constants.colorPrimary,
                borderRadius: "20px", padding:"20px"

            }}>
                {this.state.identicalPreferences &&

                <h3 style={{backgroundColor: Constants.colorError, padding: "10px 15px", width:"60%", margin:"0 auto", borderRadius: "10px"}}>Error, Two or
                    more numbers are the same. Please make sure that all rankings are unique.</h3>
                }

                <div style={this.getDayStyle()} className={this.props.week}>
                    <div>
                        <p style={{
                            fontSize: "22px", textIndent: "15px",
                            margin: "0",
                            width: "100%",
                            borderWidth: "1px",
                            borderStyle: "solid",
                        }}>Chores:</p>
                        {
                            this.state.formChores.map(day => {
                                return <div><p style={Constants.getChortPrefernceGridItemStyle(true)}>{day.name}</p>
                                </div>
                            })
                        }
                    </div>

                    {keys.map(dayKey => {
                        return <div>
                            <p style={{

                                textAlign: "center",
                                backgroundColor: Constants.colorGreenMaterial,
                                fontSize: "22px",
                                margin: "0",
                                width: "100%",
                                borderStyle: "solid",
                                borderWidth: "1px",
                                // padding:"5px 10px",
                                // borderRadius:"10px",
                            }}>{this.state.dayById[dayKey]}</p> {Object.keys(this.state.form[dayKey]).map(choreKey => {

                            return <UserPrefDayAndChoreSelector
                                preference={this.state.form[dayKey][choreKey].preference}
                                updateUserPreferenceFun={this.updatePref}
                                chore={this.state.form[dayKey][choreKey].chore}
                                day={this.state.form[dayKey][choreKey].day}/>
                        })
                        }</div>
                    })}

                </div>

                <button style={{
                    margin: "0 10px 10px 85%",
                    borderRadius: "50%",
                    background: Constants.colorGreenMaterial,
                    borderStyle: "none",
                    padding: "20px 0",
                    width: "60px",
                    height: "60px",
                    cursor: this.state.hover ? "pointer" : "context-menu"
                    // float:"right",
                }} onClick={this.updateAllUserPrefs}
                        onMouseEnter={this.hovering}
                        onMouseLeave={this.notHovering}>Submit
                </button>
            </div>
        )
    }
}


export default UserPref