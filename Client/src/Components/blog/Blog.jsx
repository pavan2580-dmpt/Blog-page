import React, { useEffect, useState } from 'react';
import axios from "axios";
import Posts from './Posts';
import ErrorBoundary from '../HandleErrors/ErrorBoundary';

function Blog() {
 
  
  return (
    <ErrorBoundary >     
           <Posts/>
    </ErrorBoundary>
  );
}

export default Blog;
