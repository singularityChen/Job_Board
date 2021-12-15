import React, { useState } from 'react';
import { MenuItems } from './MenuItems';
import axios from 'axios';
import './CusDropdown.css';
import { Link } from 'react-router-dom';
import helper from '../../helper';

function CusDropdown() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'cus-dropdown-menu clicked' : 'cus-dropdown-menu'}
      >
        <li >
          <Link
            className='cus-dropdown-link'
            to='/postjob'
            onClick={() => setClick(false)}
          >
            Post Job
          </Link>
        </li>

        <li >
          <Link
            className='cus-dropdown-link'
            to='#'
            onClick={() => {
              axios.get('/api/users/logOff')
                .then(response => {
                  console.log(response.data)
                  helper.username = '';
                  window.location.href = '/';
                })
                .catch(error => {
                  console.log(error)
                });
            }}
          >
            Log Out
          </Link>
        </li>
      </ul>
    </>
  );
}

export default CusDropdown;
