import React from 'react';
import NavbarMenu from './components/navbar/NavbarMenu';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Favorites from './components/pages/Favorites';
import Login from './components/pages/LogIn';
import SignUp from './components/pages/SignUp';
import PostJob from './components/pages/Post';
import EditJob from './components/pages/Edit';
import SearchResult from './components/pages/SearchResult';
import Details from './components/pages/Details';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <NavbarMenu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/sign-in' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/postjob' element={<PostJob />} />
        <Route path='/editjob/:id/:isFav' element={<EditJob />} />
        <Route path='/result/:keyword' element={<SearchResult />} />
        <Route path='/detail/:id' element={<Details />} />
      </Routes>
    </Router>
  );
}

export default App;
