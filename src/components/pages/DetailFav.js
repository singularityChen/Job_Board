import React, { useState, useEffect } from 'react';
import '../../App.css';
import JobDetailFav from '../jobDisplay/jobDetailFav';
import '../jobDisplay/jobDetail.css';
import axios from "axios";


export default function FavDetail() {
  return <JobDetailFav />;
  
}
