// export const colorPrimary = "#4a80ae";
import React from "react";

export const colorPrimary = "#2D9ED6";
export const colorSecondary = "#aa647b";
export const colorError = "#d32f2f";
export const colorErrorBackground = "#ac5656";
export const colorWarning = "#ffa000";
export const colorInfo = "#1976d2";
export const colorSuccess = "#388e3c";
export const colorGreenMaterial = "#4BBA87"
export const backgroundSecondaryColor = "#3f4552";


export const listRowStyle = function getGridStyle(header = false, error = false) {
    return {
        display: "grid",
        gridTemplateColumns: "6rem 7.5rem 14rem 14rem auto",
        // gridTemplateColumns: "23% 23% 23% 23% auto",
        borderRadius: "12px",
        textIndent: "18px",
        textAlign: "left",
        backgroundColor: error ? this.colorError : this.colorGreenMaterial,
        width: "800px",
        margin: header ? "18px auto" : "12px auto",
        fontWeight: header ? "bold" : "normal",
        fontSize: header ? "22px" : "18px",
        color: header ? "black" : "black",
    }
};

export const choresAndDaysGridStyle = function (header = false, error = false, chore = true) {

    let style = this.listRowStyle(false, false, true);

    style.gridTemplateColumns = "15.5rem auto";
    style.width = "380px";
    style.backgroundColor = error ? this.colorError : chore ? this.colorSecondary : this.colorPrimary;

    return style

};

export const choreAndDayInputStyle = function () {


    return {
        backgroundColor: "#282c34",
        border: "0",
        width: "auto",
        fontSize: "16px",
        padding:"11px",
        margin: "10px 18px",
        borderRadius: "5px",
        borderWidth: "0 1px",
        textIndent: "5px"
    }


};

export const getHeadingStyleChoreChartAdmin = function (){

        return {
            margin: "10px 45px",
            textAlign: "left", color: "black"
        }

}

export const baseUrl = "http://192.168.1.202:8084/";