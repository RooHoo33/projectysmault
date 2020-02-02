import React from "react";
import axios from "axios";
import * as Constants from "../../constants/constants";
import autoBind from "auto-bind";
import { CanvasJSChart} from "../../canvasjs.react";
import decode from "jwt-decode";


class ChoreChartStatsChart extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            choreChartStats: {},
            choreStatsLoaded:false,
            canvasOptions: []


        };
        autoBind(this)
    }
    componentDidMount() {

        const decoded = decode(document.cookie.replace(/(?:(?:^|.*;\s*)jwttoken\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
        const userId = decoded.userId;

        axios.get(Constants.baseUrl + "rest/chorechart/chore-stats?id=" + userId).then(res => {
            const choreChartStats = res.data;

            console.log("Complete: " + choreChartStats.choresCompleted);
            console.log("Total: "+ choreChartStats.choresTotal)
            console.log("Left: " +(choreChartStats.choresTotal- choreChartStats.choresCompleted))

            const canvasOptions = {



                backgroundColor: Constants.backgroundSecondaryColor,
                animationEnabled: true,
                theme: "dark2",

                data: [{
                    type: "doughnut",

                    showInLegend: true,
                    dataPoints: [
                        {label: "Completed", name: "Completed", y: choreChartStats.choresCompleted},
                        {label: "Left To Go",name: "Left To Go", y: (choreChartStats.choresTotal - choreChartStats.choresCompleted)},

                    ]
                }]
            };
            this.setState({choreChartStats, choreStatsLoaded:true, canvasOptions})
        })
    }
    render() {
        if (!this.state.choreStatsLoaded){
            return <div/>
        }

        return (
            <div style={{
                padding: "60px",
                backgroundColor: Constants.backgroundSecondaryColor,
                margin: "20px 10%",
                borderRadius: "10px",
            }}>

                <h1 style={{textIndent: "10px"}}>Chore Chart Stats</h1>
                <p style={{textIndent: "20px"}}>Counting The Chores This Week</p>

                <CanvasJSChart options={this.state.canvasOptions}/>

            </div>
        )
    }

}


export default ChoreChartStatsChart