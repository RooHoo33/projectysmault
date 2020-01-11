import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import decode from "jwt-decode";



axios.interceptors.request.use(config => {


    if (document.cookie.replace(/(?:(?:^|.*;\s*)jwttoken\s*\=\s*([^;]*).*$)|^.*$/, "$1")) {
        const decoded = decode(document.cookie.replace(/(?:(?:^|.*;\s*)jwttoken\s*\=\s*([^;]*).*$)|^.*$/, "$1"));
        if (decoded.exp > Date.now() / 1000) {

            let xhr = new XMLHttpRequest();
            let params = JSON.stringify({jwt: document.cookie.replace(/(?:(?:^|.*;\s*)jwttoken\s*\=\s*([^;]*).*$)|^.*$/, "$1")});

            xhr.open("POST", "http://localhost:8080/rest/authenticate/renew", false);
            // xhr.open("POST", "https://roohoo.dev/rest/authenticate/renew", false);

            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.setRequestHeader("Authorization", "Bearer " + document.cookie.replace(/(?:(?:^|.*;\s*)jwttoken\s*\=\s*([^;]*).*$)|^.*$/, "$1"));

            xhr.send(params);
            document.cookie = "jwttoken=" + JSON.parse(xhr.response).jwt+ ";path=/";

            config.headers = {
                Authorization: "Bearer " + document.cookie.replace(/(?:(?:^|.*;\s*)jwttoken\s*\=\s*([^;]*).*$)|^.*$/, "$1")
            };

        }
    }



    return config;
}, error => {
    console.log("We got an error")
    // handle the error
    return Promise.reject(error);
});

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
