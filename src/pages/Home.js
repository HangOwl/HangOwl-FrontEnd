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
  const token = localStorage.getItem("user");
  const accessToken = JSON.parse(token);
    if(accessToken){
      
      if(accessToken.Role == 0){
        history.push(`/customerhome/${accessToken.id}`);
      }
      else if(accessToken.Role == 1){
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
        <br />
      </div>
    );
}


export default Home;