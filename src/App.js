import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './App.css';

import BarDetail from './component/BarEdit/BarDetail';
import UploadButtons from './component/BarEdit/UploadButtons';
import RealBarDetail from './component/BarEdit/RealBarDetail';
import Navbar from './component/Nav/Navbar';
import EditCheckBox from './component/BarEdit/EditCheckBox';


function App() {

   return (
      <div className="App">
         
         {/* <RealBarDetail />
         <UploadButtons /> */}

         {/* <Login /> */}
         {/* <EditContent /> */}
         <EditCheckBox />

         {/* <Navbar />
         <Route exact path="/">
            <Home />
         </Route> */}
      </div>
   );
}

export default App;


