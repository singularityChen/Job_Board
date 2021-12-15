import React, { useEffect, useState } from 'react';
import '../../App.css';
import JobCardFav from '../jobDisplay/jobCardFav.js';
import axios from 'axios';
import './Favorites.css';

export default function Favorites() {
    const [allPokemon, setAllPokemon] = useState([]);
    const [userName, setUserName] = useState('');
    const [isLogged, setLog] = useState('not-log')

    function findAllPokemon() {
        axios.get('api/users/whoIsLoggedIn')
            .then(response => {
                if (response.data !== '') {
                    setLog('is-log');
                    axios.get('api/favorites/getFavJob/' + response.data)
                        .then(response => {
                            setAllPokemon(response.data)
                        })
                }
            })
            .catch(error => console.error(error));
    }

    useEffect(findAllPokemon, []);

    return <div>
        <div className="searchResult">
            <h3>Your Favorites</h3>
            <div className='jobcard'>
                <p className={isLogged}>Please log in to see your favorites.</p>
                {allPokemon.map((item, index) => {
                    return (
                        <li key={index}>
                            <JobCardFav jobInfo={item} />
                        </li>
                    );
                })}
            </div>
        </div>
    </div>
}
