import React, { useState } from 'react';
import '../../App.css';

export default function Home(props) {
  const [inputData, setInput] = useState({
    keyword: ''
  });

  const handleSearch = () => {
    var keys = inputData.keyword === '' ? 'alljobs' : inputData.keyword;
    window.location.href = '/result/' + keys;
  }

  return (
    <>
      <div className='home'>
        <h1 className='title'>Job Hunter</h1>
        <form className="row g-3">
          <div className="col-sm-2">
            <label for="searchBar" className="visually-hidden">Search Bar</label>
          </div>
          <div className="col-sm-8">
            <input type="text" id="searchBar" class="form-control" placeholder="Key word..." value={inputData.keyword} onChange={(e) => {
              const keyword = e.target.value;
              setInput({
                ...inputData,
                keyword: keyword
              })
            }} />
          </div>
          <div className="col-sm-2">
            <button type="button" className="btn btn-primary mb-3" onClick={handleSearch}>Search</button>
          </div>
        </form>
      </div>
    </>
  );
}
