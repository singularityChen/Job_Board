import './signin.css';
import axios from 'axios';
import React, { useState } from 'react';
import CryptoJs from 'crypto-js';


export default (props) => {

    const [userData, setUserData] = useState({
        password: '',
        password2: '',
        username: '',
    });


    return (
        <div>
            <div className="outer">
                <div className="inner">
                    <h3>Sign Up</h3>
                    <div className="form-group">
                        <label>username</label>
                        <input className="form-control" value={userData.username} onChange={(e) => {
                            const username = e.target.value;
                            setUserData({
                                ...userData,
                                username: username
                            })
                        }} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input className="form-control" value={userData.password} onChange={(e) => {
                            const password = e.target.value;
                            setUserData({
                                ...userData,
                                password: CryptoJs.MD5(password).toString()
                            })
                        }} type='password' />
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input className="form-control" value={userData.password2} onChange={(e) => {
                            const password2 = e.target.value;
                            setUserData({
                                ...userData,
                                password2: CryptoJs.MD5(password2).toString()
                            })
                        }} type='password' />
                    </div>

                    <button className="btn btn-dark btn-lg btn-block"
                        onClick={() => {
                            axios.post('/api/users', userData)
                                .then(response => {console.log(response)
                                    // alert(response.request.responseURL)
                                    alert(userData.password)
                                    // window.location.href = '/';
                                })
                                .catch(error => {console.log(error)
                                    alert("register fail")

                                });
                        }}
                    >Register New User</button>

                </div>
            </div>
        </div >
    );


}
