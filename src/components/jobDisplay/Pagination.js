import React, { Component } from "react";
import './Pagination.css';

export default class Pagination extends Component {
    render() {
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination pagination-md justify-content-end">
                    <li className="page-item disabled">
                        <a className="page-link">Previous</a>
                    </li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item">
                        <a className="page-link" href="#">Next</a>
                    </li>
                </ul>
            </nav>
        );
    }
}
