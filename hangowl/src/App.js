import React, { useEffect, useState } from 'react';
import './App.css';
//import Navbar from './components/Navbar';

// import Bars from './contents/bars'
import FullWidthTabs from './reservationLists';
import BarHomepage from './barHomepage';
function App() {
  
  

  return(
  //  <Router>
  //    <div className="App">
  //      <Navbar />
  //      <Route exact path="/">
  //        <Bars />
  //      </Route>
  //    </div>
  //  </Router>

    
    <div>
      <FullWidthTabs />
      {/* <BarHomepage />  */}
    </div>
    
  )
}
export default App;
