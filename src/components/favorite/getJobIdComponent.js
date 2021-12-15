import React, { useEffect, useState } from "react";
import FavComponent from '../favorite/favComponent';
import axios from "axios";


export default function JobIdComponent(props) {
    const [allFavIds, setAllFavIds] = useState([]);
    // const user = props.userName;
    const [user, setUserName] = useState('fefe');
    const [allJobs, setAllJobs] = useState([]);

    // const url = 'api/users/findFavorite/' + props



    function findAllPokemon() {
        console.log("user:", user);
        axios.get('http://localhost:8000/api/users/findFavorite/' + user)
            .then(response => {
                setAllFavIds(response.data)
                // console.log(allFavIds)
                var temp = response.data
                var array=[];
                return temp.map(id => {
                    // console.log("array:",temp)
                    axios.get('http://localhost:8000/api/jobs/findId/' + id)
                        .then(response => {
                            var arr = response.data[0];
                            array.push(arr);
                            setAllJobs(array)
                        // console.log("Alljob:",array);
                        })
                        .catch(error => console.error(error));
                        
                })
                

            })
            .catch(error => console.error(error));
    }

    useEffect(findAllPokemon, []);
    return (
        // <div className="card">
        //    Name: {user}
        //    List:{allFavIds}
        <div>
            <FavComponent idList={allJobs} />
        </div>

    );
}
