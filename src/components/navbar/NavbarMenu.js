import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FiAlignRight, FiXCircle, FiChevronDown } from "react-icons/fi";
import './NavbarMenu.css';
import axios from 'axios';

const Navbarmenu = () => {
    const [userLog, setUserLog] = useState({
        user: '',
        isLog: false
    })
    useEffect(() => {
        axios.get('/api/users/whoIsLoggedIn')
            .then(response => {
                if (response.data !== '') {
                    setUserLog({
                        ...userLog,
                        user: response.data,
                        isLog: true
                    });
                }
            })
            .catch(error => {
                console.log(error)
            });
    }, []);

    const [isMenu, setisMenu] = useState(false);
    const [isResponsiveclose, setResponsiveclose] = useState(false);
    const toggleClass = () => {
        setisMenu(isMenu === false ? true : false);
        setResponsiveclose(isResponsiveclose === false ? true : false);
    };

    const toggleClassLogout = () => {
        setisMenu(isMenu === false ? true : false);
        setResponsiveclose(isResponsiveclose === false ? true : false);
        axios.get('/api/users/logOff')
            .then(response => {
                setUserLog({
                    ...userLog,
                    user: '',
                    isLog: false
                })
            })
            .catch(error => {
                console.log(error)
            });
    };

    let boxClass = ["main-menu menu-right menuq1"];
    if (isMenu) {
        boxClass.push('menuq2');
    } else {
        boxClass.push('');
    }

    const [isMenuSubMenu, setMenuSubMenu] = useState(false);

    const toggleSubmenu = () => {
        setMenuSubMenu(isMenuSubMenu === false ? true : false);
    };

    let boxClassSubMenu = ["sub__menus"];
    if (isMenuSubMenu) {
        boxClassSubMenu.push('sub__menus__Active');
    } else {
        boxClassSubMenu.push('');
    }

    if (userLog.isLog === false) {
        return (
            <header className="header__middle">
                <div className="container">
                    <div className="row">
                        <div className="header__middle__menus">
                            <nav className="main-nav " >

                                {isResponsiveclose === true ? <>
                                    <span className="menubar__button" style={{ display: 'none' }} onClick={toggleClass} > <FiXCircle />   </span>
                                </> : <>
                                    <span className="menubar__button" style={{ display: 'none' }} onClick={toggleClass} > <FiAlignRight />   </span>
                                </>}


                                <ul className={boxClass.join(' ')}>
                                    <li className="menu-item" >
                                        <NavLink exact activeClassName='is-active' onClick={toggleClass} to={`/`}> Home </NavLink>
                                    </li>
                                    <li className="menu-item " >
                                        <NavLink onClick={toggleClass} activeClassName='is-active' to={`/favorites`}> Favorites </NavLink>
                                    </li>
                                    <li className="menu-item " ><NavLink onClick={toggleClass} activeClassName='is-active' to={`/sign-in`}> Sign in/Sign up </NavLink> </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
    else {
        return (
            <header className="header__middle">
                <div className="container">
                    <div className="row">
                        <div className="header__middle__menus">
                            <nav className="main-nav " >

                                {isResponsiveclose === true ? <>
                                    <span className="menubar__button" style={{ display: 'none' }} onClick={toggleClass} > <FiXCircle />   </span>
                                </> : <>
                                    <span className="menubar__button" style={{ display: 'none' }} onClick={toggleClass} > <FiAlignRight />   </span>
                                </>}

                                <ul className={boxClass.join(' ')}>
                                    <li className="menu-item" >
                                        <NavLink exact activeClassName='is-active' onClick={toggleClass} to={`/`}> Home </NavLink>
                                    </li>
                                    <li className="menu-item " >
                                        <NavLink onClick={toggleClass} activeClassName='is-active' to={`/favorites`}> Favorites </NavLink>
                                    </li>
                                    <li onClick={toggleSubmenu} className="menu-item sub__menus__arrows" > <Link to="#"> {userLog.user} <FiChevronDown /> </Link>
                                        <ul className={boxClassSubMenu.join(' ')} >
                                            <li className='cus-dropdown'> <NavLink onClick={toggleClass} activeClassName='is-active' to={`/postjob`}> Post Job </NavLink> </li>
                                            <li className='cus-dropdown'><NavLink onClick={toggleClassLogout} activeClassName='is-active' to={`/`}> Log Out </NavLink> </li>
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Navbarmenu