import React, { useEffect, useState } from 'react';
import './App.css';

import FetchReserved from './FetchReserved';
import BarDetail from './component/BarEdit/BarDetail';
import SimpleModal from './component/BarEdit/Modal';
import Pro from './component/BarEdit/sentt';

//import PersonList from './component/PersonList';

// import GetRequestHooks from 'GetRequestHooks';
//import axios from 'axios';


function App() {

   return (
      <div className="App">
         <p></p>
         {/* <FetchReserved />  */}
         <BarDetail /> 
         {/* <Login /> */}
         {/* <EditContent /> */}
         {/* <Pro /> */}
      </div>
   );
}

export default App;


