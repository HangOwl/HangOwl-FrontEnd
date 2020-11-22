import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import Welcome from '../Pics/Welcome_To_HangOwl.png';
import Navbar from '../components/Navbar/Navbar';
import BarCard from '../components/BarCard/BarCard';
import './Home.css'
import {useHistory} from 'react-router-dom'
import { HomeWork } from '@material-ui/icons';

function Home() {
  let history = useHistory();
    if(window.Role != null){
      if(window.Role == 0){
        history.push(`/customerhome/${window.cusID}`);
      }
      else if(window.Role == 1){
        history.push(`/BarHome`);
      }
    }
    return (
      <div className="Landing">
        <Navbar/>
        <br/><br/><br/>
        <div>
          <img src={Welcome} className="welcome" alt="" />
        </div>
        <header>
          <h1 className='rectext'><br/><br/><br/>Let's have a look for some recommended Bars :)</h1>
        </header>
        <BarCard/>
      </div>
    );
}


export default Home;