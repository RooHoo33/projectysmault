// export const colorPrimary = "#4a80ae";
export const colorPrimary = "#2D9ED6";
export const colorSecondary = "#aa647b";
export const colorError = "#d32f2f";
export const colorErrorBackground = "#ac5656";
export const colorWarning = "#ffa000";
export const colorInfo = "#1976d2";
export const colorSuccess = "#388e3c";
export const colorGreenMaterial = "#4BBA87"
export const backgroundSecondaryColor = "#3f4552";


export const listRowStyle = function getGridStyle(header = false){
    return {
        display: "grid",
        gridTemplateColumns: "6rem 7.5rem 14rem 14rem auto",
        // gridTemplateColumns: "23% 23% 23% 23% auto",
        borderRadius: "12px",
        textIndent:"18px",
        textAlign: "left",
        backgroundColor: this.colorGreenMaterial,
        width: "800px",
        margin: header ? "18px auto" : "12px auto",
        fontWeight: header ? "bold" : "normal",
        fontSize: header ? "22px" : "16px",
        color: header ? "black" : "black",
    }
};

export const baseUrl = "http://localhost:8080/";