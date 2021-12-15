import React, { useEffect, useState } from "react";
import './PostJob.css';
import { Link } from "react-router-dom";
import axios from "axios";

export default (props) => {
  const currurl = window.location.pathname;
  const path = currurl.split('/');
  const isFav = path[path.length - 1];
  const id = path[path.length - 2];
  console.log("location:", isFav)


  const [jobData, setJobData] = useState({
    job: '',
    user: '',
    company: '',
    location: '',
    description: '',
    email: '',
    website: ''
  });

  const [favData, setFavData] = useState({
    job: '',
    company: '',
    location: '',
    description: '',
    email: '',
    website: ''
  });

  useEffect(() => {
    axios.get('/api/users/whoIsLoggedIn')
      .then(res => {
        setJobData({
          ...jobData,
          user: res.data
        })
        var url = '/api/jobs/findId/' + id;
        axios.get(url)
          .then(response => {
            console.log(response.data[0])
            setJobData({
              ...jobData,
              job: response.data[0].job,
              company: response.data[0].company,
              location: response.data[0].location,
              description: response.data[0].description,
              email: response.data[0].email,
              website: response.data[0].website,
              user: res.data
            })
            if (isFav === "true") {
              setFavData({
                ...favData,
                job: response.data[0].job,
                company: response.data[0].company,
                location: response.data[0].location,
                description: response.data[0].description,
                email: response.data[0].email,
                website: response.data[0].website
              })
            }

          })
          .catch(error => {
            console.log(error)
            alert("edit job fail")

          });
        console.log("user:", res.data)

      })
      .catch(error => {
        console.log(error)
        alert("get user fail")

      });

  }, []);

  const handleEdit = () => {
    var urlJob = '/api/jobs/edit/' + id;
    var urlFav = '/api/favorites/editFav/' + id;
    axios.put(urlJob, jobData)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
        // alert("edit job fail")

      });
    console.log(favData);
    if (isFav === "true")
      axios.put(urlFav, favData)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error)
          // alert("edit job fail fav")

        });
  }


  const handleCancel = () => {
    window.location.href = document.referrer;
  }
  return (
    <div className="outer">
      <div className="inner">
        <form className="form-horizontal">
          <h3>Post A New Job</h3>
          <div className="form-group">
            <label for="inputTitle" className="col-sm-2 control-label">Job Title
              {/* <span class="material-icons">star_rate</span> */}
            </label>
            <div class="col-sm-10">
              <input type="text" className="form-control" id="inputTitle" placeholder="Job Title" value={jobData.job} onChange={(e) => {
                const job = e.target.value;
                setJobData({
                  ...jobData,
                  job: job
                })
              }}
                required />
            </div>
          </div>
          <div className="form-group">
            <label for="inputCompany" className="col-sm-2 control-label">Company</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="inputCompany" placeholder="Company" value={jobData.company} onChange={(e) => {
                const company = e.target.value;
                setJobData({
                  ...jobData,
                  company: company
                })
              }}
                required />
            </div>
          </div>
          <div className="form-group">
            <label for="inputLocation" className="col-sm-2 control-label">Location</label>
            <div class="col-sm-10">
              <input type="text" className="form-control" id="inputLocation" placeholder="Location" value={jobData.location} onChange={(e) => {
                const location = e.target.value;
                setJobData({
                  ...jobData,
                  location: location
                })
              }}
                required />
            </div>
            <div id="passwordHelpBlock" class="form-text">Mutiple locations split with ";"</div>
          </div>
          <div className="form-group">
            <label for="inputDescription" className="col-sm-2 control-label">Description</label>
            <div className="col-sm-10">
              <textarea className="form-control" id="inputDescription" placeholder="Description" rows="4" value={jobData.description} onChange={(e) => {
                const description = e.target.value;
                setJobData({
                  ...jobData,
                  description: description
                })
              }}
                required />
            </div>
          </div>
          <div className="form-group has-warning">
            <label for="inputContact" className="col-sm-2 control-label">Contact Email</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="inputContact" placeholder="Email" value={jobData.email} onChange={(e) => {
                const email = e.target.value;
                setJobData({
                  ...jobData,
                  email: email
                })
              }}
                required />
            </div>
          </div>
          <div className="form-group">
            <label for="inputWeb" className="col-sm-2 control-label">Website</label>
            <div className="col-sm-10">
              <input type="url" className="form-control" id="inputWeb" placeholder="Website" value={jobData.website} onChange={(e) => {
                const website = e.target.value;
                setJobData({
                  ...jobData,
                  website: website
                })
              }} />
            </div>
          </div>
          <div className="mb-3">
            <div className="col-sm-offset-2 col-sm-2">
              <button type="button" className="btn btn-success btn-lg"
                onClick={handleEdit}

              >Submit</button>
            </div>
            <div className="col-sm-offset-2 col-sm-2">
              <Link to='/'>
                <button type="button" className="btn btn-default btn-lg" onClick={handleCancel}>Cancel</button>
              </Link>
            </div>
          </div>
          {/* <div className="mb-3 row">
              <div className="col-sm-offset-2 col-sm-2">
                <button type="button" className={favButtonName} >{favContent}</button>
              </div>
              <div className="col-sm-offset-2 col-sm-2">
                <button type="button" className="btn btn-info btn-lg" >Edit</button>
              </div>
            </div> */}
          {/* <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <Link to='/'>
                  <button type="button" className="btn btn-default btn-lg" >Cancel</button>
                </Link>
              </div>
            </div> */}
        </form>
      </div>
    </div>
  );
}