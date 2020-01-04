import React from "react";
import axios from "axios";
import * as Constants from "../constants/constants"

import { Redirect} from "react-router-dom";
import TermInfo from "./ChoreChartAdmin/TermInfo";
import AddTermInfo from "./ChoreChartAdmin/AddTermInfo";


class ChoreChartAdmin extends React.Component{


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
        this.editATerm = this.editATerm.bind(this)
    }

    editATerm(edit, termToEdit = {}){
        this.setState({editATerm:edit});
        this.setState({term: termToEdit});

    }

    getTermInfoHeader(){
        return (
            <div style={Constants.listRowStyle(true)} className={"termInfoHeader"}>

                <p>Active</p>
                <p>Workers</p>
                <p>Start of Term</p>
                <p>End of Term</p>
                <p style={{textAlign:"center",}}>Edit</p>
            </div>
        )
    }



    handleErrors(error, currentComponent){
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

    getTermInfoGroupStyle(){
        return {
            background: Constants.backgroundSecondaryColor,
            width: "850px",
            margin: "0 auto",
            borderRadius: "20px",
            padding: "30px"
        }
    }

    componentDidMount() {

        let currentComponent = this;

        axios.get(Constants.baseUrl + "rest/chorechart/admin/choredays").then(res => {
            const jsonDays = res.data;
            this.setState({days: jsonDays});
        }).catch(function (error) {
            currentComponent.handleErrors(error, currentComponent)
        });

        axios.get(Constants.baseUrl + "rest/chorechart/admin/chorechores").then(res => {
            const jsonChores = res.data;
            this.setState({chores: jsonChores});
        }).catch(function (error) {
            currentComponent.handleErrors(error, currentComponent)
        });

        axios.get(Constants.baseUrl + "rest/chorechart/admin/terminformations").then(res => {
            const jsonTermInfos = res.data;
            console.log(jsonTermInfos);
            jsonTermInfos.map(it =>
                    it.termStart = new Date(it.termStart[0], it.termStart[1]-1, it.termStart[2])
            );

            jsonTermInfos.map(it =>it.edit = false);

            jsonTermInfos.map(it =>
                    it.termEnd = new Date(it.termEnd[0], it.termEnd[1]-1, it.termEnd[2])
            );

            this.setState({termInfos: jsonTermInfos});
        }).catch(function (error) {
            currentComponent.handleErrors(error, currentComponent)
        });
    }

    render(){

        if (!this.state.loggedOn) {
            return <Redirect to={"/login"}/>
        }
        return (


            <div style={this.getTermInfoGroupStyle()} className={"ChoreChartAdmin"}>

                <div className={"termInfos"}>
                    <h1 style={{textIndent:"45px",
                        textAlign: "left",color:"black"}}>Term Information</h1>
                    {this.getTermInfoHeader()}

                    {/*{this.state.editATerm &&*/}
                    {/*<AddTermInfo term={this.state.term} edit={this.editATerm}/>}*/}

                {this.state.termInfos.map(termInfo =>


                <TermInfo term={termInfo} editTerm={this.editATerm}/>
                )}
                </div>
            </div>
        )
    }
}

export default ChoreChartAdmin