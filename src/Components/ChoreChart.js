import React from "react";
import ChoreChartUserPrefPage from "./ChoreChartUserPref/ChoreChartUserPrefPage";
import ChoreChartDisplay from "./ChoreChartDisplay";
import ChoreChartStatsChart from "./ChoreChartUserPref/ChoreChartStatsChart";

class ChoreChart extends React.Component {

    render() {
        return (
            <div>
                <ChoreChartDisplay/>
                <ChoreChartStatsChart/>
                <ChoreChartUserPrefPage/>
            </div>
        );
    }

}
export default ChoreChart