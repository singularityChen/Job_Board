
import React, { Component } from "react";
import './jobCard.css';

export default class JobCard extends Component {
    constructor(props){
        super(props);
        
    }
    
    render() {
            const detailUrl = '/detail/' + this.props.jobInfo.jobid;
        return (
            <div className="card">
                {/* <img src={this.props.jobInfo.img===undefined?'...' : this.props.jobInfo.img} class="card-img-top" alt="..." /> */}
                <img src="/images/img-1.jpg" className="card-img-top" alt="..." />

                <div className ="card-body">
                <h5 className ="card-title">{this.props.jobInfo.job}</h5>
                <p className ="card-text">Company: {this.props.jobInfo.company}</p>
                <p className ="card-text">Location: {this.props.jobInfo.location}</p>
                <a href={detailUrl} className ="btn btn-primary">Details</a>
                </div>
            </div>
        );
    }
}
// }
