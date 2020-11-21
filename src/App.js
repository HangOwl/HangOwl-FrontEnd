import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css';

import BarDetail from './component/BarEdit/BarDetail';
// import UploadButtons from './component/BarEdit/UploadButtons';
// import Navbar from './component/Nav/Navbar';
// import EditCheckBox from './component/BarEdit/EditCheckBox';
import BarHomepage from './component/BarHomepage'
import ShowBarDetail from './component/ShowBarDetail'
import ReservedList from './component/Test'

function App() {

   return (
      <div className="App">
         <Router>
            <Switch>
               <Route path='/' exact component={BarHomepage} />
               <Route path='/bardetails' component={BarDetail} />
               <Route path='/reservations' component={ReservedList} /> 
               <Route path='/customerviews' component={ShowBarDetail} />
            </Switch>
         </Router>
         {/* HELLO */}
         {/* <RealBarDetail /> */}
         {/* <UploadButtons /> */}

         {/* <Login /> */}
         {/* <EditContent /> */}
         {/* <EditCheckBox /> */}

         {/* <Navbar />
         <Route exact path="/">
            <Home />
         </Route> */}
      </div>
   );
}

export default App;


