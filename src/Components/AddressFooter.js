import React from "react";

class AddressFooter extends React.Component {

    getFooterStyle() {
        return {
            textAlign: "right",
            color: "white",
            lineHeight: "80%"


        }
    }

    render() {
        return (
            <div className={"footerAdress"}>
                <h1 style={this.getFooterStyle()}>Theta Xi Fraternity</h1>
                <h2 style={this.getFooterStyle()}>Kappa Sigma Chapter</h2>
                <h3 style={this.getFooterStyle()}>2829 Sunset Drive</h3>
                <h3 style={this.getFooterStyle()}>Flint MI, 48503</h3>

            </div>
        )
    }

}

export default AddressFooter;