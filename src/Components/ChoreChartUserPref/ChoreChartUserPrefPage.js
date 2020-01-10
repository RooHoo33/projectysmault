import React from "react";
import decode from "jwt-decode";
import autoBind from "auto-bind";
import {Redirect} from "react-router-dom";
import axios from "axios";
import * as Constants from "../../constants/constants";
import UserPref from "./UserPref";

class ChoreChartUserPrefPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedOn: true,
            loadedUserPrefs: false,

        };
        autoBind(this)
    }

    componentDidMount() {

        let currentComponent = this

        if (!document.cookie.replace(/(?:(?:^|.*;\s*)jwttoken\s*\=\s*([^;]*).*$)|^.*$/, "$1")){
            this.setState({loggedOn: false});
            return
        }
        const decoded = decode(document.cookie.replace(/(?:(?:^|.*;\s*)jwttoken\s*\=\s*([^;]*).*$)|^.*$/, "$1"));

        axios.get(Constants.baseUrl + "rest/chorechart/userprefs?id=" + decoded.userId).then(res => {
            const jsonUserPrefs = res.data;
            let userPrefs = {};

            jsonUserPrefs.forEach(function (userPref) {
                if (userPrefs[userPref.week] !== undefined){
                    userPrefs[userPref.week].push(userPref)

                }else {
                    userPrefs[userPref.week] = [userPref]
                }
            });



            this.setState({userPrefs : userPrefs, loadedUserPrefs:true})
        }).catch(function (error) {
            if (error.response.status === 401){
                currentComponent.setState({loggedOn: false})
            }
            // currentComponent.setState({loggedOn: false})
        });

        this.setState({userId: decoded.userId});
    }


    render() {

        if (!this.state.loggedOn){
            return <Redirect to={"/login"}/>
        }

        if (!this.state.loadedUserPrefs){
            return <div/>
        }
        return (
            <div className={"userPref"} style={{
                padding:"60px",
                backgroundColor: Constants.backgroundSecondaryColor,
                margin: "20px 10%",
                borderRadius: "10px",
            }}>

                {Object.keys(this.state.userPrefs).length ===0 &&
                <UserPref week={"default"} userPrefs={[]}/>
                }
                {Object.keys(this.state.userPrefs).map(userPrefKey =>
                <UserPref week={userPrefKey} userPrefs={this.state.userPrefs[userPrefKey]}/>)}


            </div>
        )

    }
}

export default ChoreChartUserPrefPage