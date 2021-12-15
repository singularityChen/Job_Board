import React, { Component, useEffect, useState } from "react";
import './jobDetail.css';
import jsonData from './testdata.json';
import { Link } from "react-router-dom";
import axios from "axios";

export default function JobDetail() {
    const currurl = window.location.pathname;
    const path = currurl.split('/');
    const id = path[path.length - 1];

    const [jobIfo, setJobInfo] = useState({
        jobid: '',
        job: '',
        user: '',
        company: '',
        location: '',
        description: '',
        email: '',
        website: ''
    });

    const [jobData, setJob] = useState({
        datas: []
    });

    const [userLog, setLog] = useState('');
    const [allFavorites, setAllFavorites] = useState([]);
    const [isFav, setFav] = useState(false);
    const [isHost, setHost] = useState('not-host');
    const [isLogged, setIsLog] = useState('not-log')


    async function getLoggedUser() {
        const errorUser = await axios.get('/api/users/whoIsLoggedIn')
            .then(resUser => {
                if (resUser.data !== '') {
                    setIsLog('is-log');
                    // console.log(resUser.data)
                    const name = resUser.data;
                    setLog(resUser.data);
                    axios.get('/api/jobs/findId/' + id)
                        .then(response => {
                            setJobInfo({
                                ...jobIfo,
                                jobid: id,
                                user: resUser.data,
                                job: response.data[0].job,
                                company: response.data[0].company,
                                location: response.data[0].location,
                                description: response.data[0].description,
                                email: response.data[0].email,
                                website: response.data[0].website
                            })
                            if (resUser.data === response.data[0].user) {
                                setHost('is-host');
                            }
                        })
                        .catch(error => {
                            console.log(error)
                        });
                    axios.get('/api/users/findFavorite/' + resUser.data)
                        .then(response => {
                            setAllFavorites(response.data)
                            response.data.some(jobid => {
                                if (jobid === id) {
                                    setFav(true);
                                    return true
                                }
                            })
                        })
                        .catch(error => console.error(error));
                }
            })
        return errorUser;
    }



    function getJobDetail() {
        var url = '/api/jobs/findId/' + id;
        axios.get(url)
            .then(response => {
                setJob({
                    ...jobData,
                    datas: response.data[0]
                })
            })
            .catch(error => {
                console.log(error)
            });

        getLoggedUser().catch(errorUser => console.error(errorUser));
        console.log(userLog);


    }


    useEffect(getJobDetail, []);

    const handleFavorite = () => {
        console.log(jobIfo);

        if (isFav === true) {
            console.log(isFav)
            var urlUser = '/api/users/unfavorite';
            var urlFav = '/api/favorites/delete/' + jobData.datas._id + '/' + userLog;
            axios.delete(urlFav)
                .then(response => {
                    console.log(response)
                })
                .catch(error => console.error(error));
        }
        else {
            var urlUser = '/api/users/favorite';
            var urlFav = '/api/favorites/createFav'
        }

        axios.post(urlFav, jobIfo)
            .then(response => {
                console.log(response)
            })
            .catch(error => console.error(error));

        axios.put(urlUser, {
            id: id
        })
            .then(response => {
                setFav(!isFav);
                console.log(response)
            })
            .catch(error => console.error(error));
    }

    const handleDelete = () => {
        var urlFav = '/api/favorites/deleteJob/' + jobIfo.jobid;
        var urlJob = '/api/jobs/delete/' + id;
        console.log(urlFav)
        axios.delete(urlFav)
        .then(response => {
            // window.location.href = '/';
            console.log(response)
        })
        .catch(error => console.error(error));
        axios.delete(urlJob)
            .then(response => {
                // window.location.href = '/';
                console.log(response)
            })
            .catch(error => console.error(error));
        

    }

    const handleEdit = () => {
        window.location.href = '/editjob/' + id;
    }



    return <div>
        <div className="outer">
            <div className="inner">
                {/* <form> */}
                <div className="mb-3 row">
                    {/* <label for="staticTitle" className="col-sm-12 col-form-label">Job Title:  {jobData.datas.job}</label> */}
                    <label for="staticTitle" className="col-sm-12 col-form-label">Job Title:  {jobData.datas.job}</label>

                </div>
                <div className="mb-3 row">
                    <label for="staticCompany" className="col-sm-12 col-form-label">Company:  {jobData.datas.company}</label>
                </div>
                <div className="mb-3 row">
                    <label for="staticLocation" className="col-sm-12 col-form-label">Location:  {jobData.datas.location}</label>
                </div>
                {/* <div className="mb-3 row">
                            <label for="staticDate" className="col-sm-12 col-form-label">Post Date:  {jsonData.date}</label>
                        </div> */}
                <div className="mb-3 row">
                    <label for="staticDescription" className="col-sm-12 col-form-label">Description:  {jobData.datas.description}</label>
                </div>
                <div className="mb-3 row">
                    <label for="staticEmail" className="col-sm-12 col-form-label">Contact Email:  {jobData.datas.email}</label>
                </div>
                <div className="mb-3 row">
                    <label for="staticWeb" className="col-sm-12 col-form-label">Webpage:  {jobData.datas.website}</label>
                </div>
                <div className="mb-3">
                    <div className="col-sm-offset-2 col-sm-2">
                        <button type="button" id={isLogged} className={isFav === true ? "btn btn-secondary btn-lg" : "btn btn-danger btn-lg"} onClick={handleFavorite}>{isFav === true ? "Unfavorite" : "Favorite"} </button>
                    </div>
                    <div className="col-sm-offset-2 col-sm-2">
                        <button type="button" className="btn btn-info btn-lg" id={isHost} onClick={handleEdit}>Edit</button>
                    </div>
                    <div className="col-sm-offset-2 col-sm-2">
                        <button type="button" className="btn btn-info btn-lg" id={isHost} onClick={handleDelete}>Delete</button>
                    </div>
                </div>
                {/* </form> */}
            </div>
        </div >
    </div>

}