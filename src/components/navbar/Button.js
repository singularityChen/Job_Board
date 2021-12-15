import React, { useState } from 'react';
import './Button.css';
import { Link } from 'react-router-dom';
import helper from '../../helper';
import CusDropdown from './CusDropdown';

export function Button() {
  const [cus_dropdown, setCusDropdown] = useState(false);
  const [click, setClick] = useState(false);


  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setCusDropdown(false);
    } else {
      setCusDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setCusDropdown(false);
    } else {
      setCusDropdown(false);
    }
  };
  if(helper.username === ''){
  return (
    <Link to='/sign-in'>
      <button className='navbar-signin'>Sign Up/Sign in</button>
    </Link>
  );
  }
  else {
    return (
      <li
      className='nav-item'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link to='#'
        className='nav-links'
        onClick={closeMobileMenu}
      >
        {helper.username} <i className='fas fa-caret-down' />
      </Link>
      {cus_dropdown && <CusDropdown />}
      </li>
    );
  }
}
