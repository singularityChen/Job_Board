import React, { useState } from "react";
import axios from "axios";
import './signin.css';
import CryptoJs from 'crypto-js';


export default (props) => {
    // render() {
    const [userData, setUserData] = useState({
        password: '',
        username: '',
    });
    return (
        <div className="outer">
            <div className="inner">
                {/* <form> */}
                <h3>Log in</h3>

                <div className="form-group">
                    <label>username</label>
                    <input type="text" className="form-control" placeholder="Enter username" value={userData.username} onChange={(e) => {
                        const username = e.target.value;
                        setUserData({
                            ...userData,
                            username: username
                        })
                    }} />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" value={userData.password} onChange={(e) => {
                        const password = e.target.value;
                        setUserData({
                            ...userData,
                            password: CryptoJs.MD5(password).toString()
                        })
                    }} />
                </div>

                <button className="btn btn-dark btn-ml btn-block"
                    onClick={() => {
                        axios.post('/api/users/authenticate', userData)
                            .then(response => {
                                console.log(response)
                                if (response.status === 404) {
                                    alert("The user or password is wrong.")
                                }
                                // alert(response.request.responseURL)
                                else {
                                    window.location.href = '/';
                                }
                            })
                            .catch(error => {
                                console.log(error)
                                alert("Please check the username or password")

                            });
                    }}
                >Log in</button>

                <p className="creat-account text-right">
                    Not have an account? <a href="/sign-up">Register Now</a>
                </p>
                {/* </form> */}
            </div>
        </div>
    );
}
// }
