import React, { useEffect, useState } from 'react';
import '../../App.css';
import JobCard from '../jobDisplay/jobCard.js';
import axios from 'axios';

export default function SearchResult(props) {
    const currurl = window.location.pathname;
    const path = currurl.split('/');
    const keyword = path[path.length - 1];
    const [jobData, setJob] = useState({
        datas: []
    });

    useEffect(() => {
        if (keyword === 'alljobs') {
            var url = '/api/jobs/findAll';
            axios.get(url)
                .then(response => {
                    setJob({
                        ...jobData,
                        datas: response.data
                    })
                })
                .catch(error => {
                    console.log(error)
                });
        }
        else {
            var url = '/api/jobs/findJob/' + keyword;
            axios.get(url)
                .then(response => {
                    setJob({
                        ...jobData,
                        datas: response.data
                    })
                })
                .catch(error => {
                    console.log(error)
                });
        }
    }, []);

    return <div>
        <div className="searchResult">
            <h3>Search Result for "{keyword}"</h3>
            <div className='jobcard'>
                {jobData.datas.map((item, index) => {
                    return (
                        <li key={index}>
                            <JobCard jobInfo={item} />
                        </li>
                    );
                })}
            </div>
        </div>
    </div>
}
