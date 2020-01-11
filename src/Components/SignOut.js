import React from "react";

import {Redirect} from "react-router-dom";


class SignOut extends React.Component{

    componentDidMount() {

        document.cookie = 'jwttoken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    render() {
        return (
            <div>
                <Redirect to={"/"}/>
            </div>
        );
    }

}

export default SignOut