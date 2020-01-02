import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

axios.interceptors.request.use(config => {

    if (document.cookie.replace(/(?:(?:^|.*;\s*)jwttoken\s*\=\s*([^;]*).*$)|^.*$/, "$1")) {
        let xhr = new XMLHttpRequest();
        let params = JSON.stringify({jwt: document.cookie.replace(/(?:(?:^|.*;\s*)jwttoken\s*\=\s*([^;]*).*$)|^.*$/, "$1")});

        xhr.open("POST","http://localhost:8080/authenticate/renew",false);

        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader("Authorization", "Bearer " + document.cookie.replace(/(?:(?:^|.*;\s*)jwttoken\s*\=\s*([^;]*).*$)|^.*$/, "$1"));

        xhr.send(params);
        document.cookie = "jwttoken=" + JSON.parse(xhr.response).jwt;

    }

    return config;
}, error => {
    // handle the error
    return Promise.reject(error);
});

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
