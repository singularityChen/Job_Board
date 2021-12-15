import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../jobDisplay/jobCard";


export default function JobIdComponent(props) {

    const [allFavIds, setAllFavIds] = useState(['61b2701fc1235bd40770b012', '61b84078ac0f1bbece9dafc5']);
    // const user = props.userName;
    const [allJobs, setAllJobs] = useState([]);
    const [count,setCount] = useState(1);
    const joblist = props.idList;
    console.log("favComponent.props:",joblist)



    function findAllPokemon() {
        allFavIds.map(id => {
            axios.get('http://localhost:8000/api/jobs/findId/' + id)
                .then(response => {
                    var arr = response.data[0];
                    setAllJobs([...allJobs, arr])
                })
                .catch(error => console.error(error));
        })

    }

    useEffect(findAllPokemon, []);
    return <div className="searchResult">
        <h3>Your Favorites </h3>
        <div className='jobcard'>
            {allJobs.map(job => {
                // console.log("search:" + JSON.stringify(job))
                return (
                    <li key={job._id}>
                        {/* {job._id} */}
                        <JobCard jobInfo={job} />
                    </li>
                )
            })}
        </div>
    </div>

}
