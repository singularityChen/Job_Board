import React, { useEffect, useState } from 'react';
import '../../App.css';
import JobCardFav from '../jobDisplay/jobCardFav.js';
import Pagination from '../jobDisplay/Pagination';
import axios from 'axios';
import helper from '../../helper';
import JobIdComponent from '../favorite/getJobIdComponent';

export default function Favorites() {

  const [allPokemon, setAllPokemon] = useState([]);
  const [userName, setUserName] = useState('');



    function findAllPokemon() {
        axios.get('api/users/whoIsLoggedIn')
            .then(response => {
              setUserName(response.data)
              axios.get('api/favorites/getFavJob/' + response.data)
              .then(response => {
                console.log("FavList Data: ",response.data)
                setAllPokemon(response.data)
              })
            })
            .catch(error => console.error(error));
    }

    useEffect(findAllPokemon, []);
    return <div>
    <div className="searchResult">
        <h3>Search Result</h3>
        <div className='jobcard'>
            {allPokemon.map((item, index) => {
                console.log("search:"+JSON.stringify(item))
                return (
                    <li key={index}>
                        <JobCardFav jobInfo={item} />
                    </li>
                );

            })}

            {/* <JobCard />
                <JobCard />
                <JobCard />
                <JobCard /> */}
        </div>
    </div>
    <Pagination />
</div>
}
