import React from "react";
import ChoreChartUserPrefPage from "./ChoreChartUserPref/ChoreChartUserPrefPage";
import ChoreChartDisplay from "./ChoreChartDisplay";

class ChoreChart extends React.Component {

    render() {
        return (
            <div>
                <ChoreChartDisplay/>
                <ChoreChartUserPrefPage/>
            </div>
        );
    }

}
export default ChoreChart