import React from "react";
import * as Constants from "../constants/constants";

/**
 * submitFun=what to do when the submit button is clicked
 * editValue= boolean to determine whether to display the submit button and cancel button(true) or
 * display the (edit and delete) and (confirm delete or cancel)(false)
 *
 * editFun= what to do when editing
 * cancelEditFun= cancels the edit mode
 * deleteConfirmationFun= what to do when you want to delete something
 *
 *
 */

class DeleteEditSaveButtons extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hover: false,
            delete: false,
        };

        this.hovering = this.hovering.bind(this);
        this.notHovering = this.notHovering.bind(this);

        this.delete = this.delete.bind(this);
    }

    hovering() {
        this.setState({hover: true});
    }

    notHovering() {
        this.setState({hover: false});
    }

    delete() {
        this.setState({delete: !this.state.delete})
    }

    getIconStyle(color = "black") {
        return {
            color: color,
            margin: "auto auto",
            fontSize: "28px",
            letterSpacing: "8px",
            textAlign: "center",
            cursor: this.state.hover ? "pointer" : "context-menu"
        }
    }


    render() {
        if (!this.props.editValue){
            return (
                <div style={{margin: "auto"}} className={"editOrDelete"}>
                    {!this.state.delete &&
                    <div className={"editOrDelete"}>
                        <p style={this.getIconStyle()} onMouseEnter={this.hovering} onMouseLeave={this.notHovering}
                           onClick={this.props.editFun} className="material-icons">edit</p>
                        <p style={this.getIconStyle()} onMouseEnter={this.hovering} onMouseLeave={this.notHovering}
                           onClick={this.delete} className="material-icons">delete</p>
                    </div>
                    }
                    {this.state.delete &&
                    <div className={"deleteForeverOrCancel"}>
                        <p style={this.getIconStyle("red")} onMouseEnter={this.hovering} onMouseLeave={this.notHovering}
                           onClick={this.props.deleteConfirmationFun} className="material-icons">delete_forever</p>
                        <p style={this.getIconStyle()} onMouseEnter={this.hovering} onMouseLeave={this.notHovering}
                           onClick={this.delete} className="material-icons">cancel</p>
                    </div>
                    }
                </div>
            )
        } else {
            return (
                <div style={{margin: "auto"}} className={"editThing"}>
                    <p style={this.getIconStyle(Constants.colorSuccess)} onMouseEnter={this.hovering}
                       onMouseLeave={this.notHovering}
                       onClick={this.props.submitFun}
                       className="material-icons">send</p>
                    &nbsp;
                    <p style={this.getIconStyle(Constants.colorSecondary)} onMouseEnter={this.hovering}
                       onMouseLeave={this.notHovering}
                       onClick={this.props.cancelEditFun}
                       className="material-icons">cancel</p>
                </div>
            )
        }


    }

}

export default DeleteEditSaveButtons