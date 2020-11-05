import React from 'react';
import axios from 'axios';


const Login = () => {
    axios.post("http://35.240.130.253:3001/auth/login", {
        username: 'srisawasdina@gmail.com',
        password: 'naboon'
    },{
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        }
    })
    .then((response) => {
        console.log(response);
       
    }).catch(error => {
        console.log(error);
    });      

    return (
        <div> Kuay </div>
    );
    
}

export default Login;