import React, { useState, useEffect, useRef } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Sidebar_bars } from './Sidebar';
import './Navbar.css';
import { IconContext } from 'react-icons';
import logo from '/mnt/c/namtanii/Year3/SoftEng/HangOwl-FrontEnd/src/component/img/HangOwlLogo (2).png';


function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const [sidestate, setSidestate] = useState(false);
  const [modalPath, setModalPath] = useState(null);
  const [changePage, setChangePage] = useState(false);
  const [term, setTerm] = useState('');
  const ref = useRef();

  const showSidebar = () => {
    setSidebar(!sidebar)
    console.log('show sidebar', sidebar);
  };

  const handleChange = (item) => {
    setSidestate(!sidestate);
    setModalPath(item);
  };

  const handleChange2 = () => {
    //onsole.log('naboon');
    setSidestate(false);
  }

  useEffect(() => {        
      const timeoutId = setTimeout(() => {
        if (term){
          console.log(term);
          setChangePage(true);
        }
        setChangePage(false);
      }, 1000);
      return () => {
        clearTimeout(timeoutId);
        setChangePage(false);
      }
  }, [term]);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={() => {showSidebar(); handleChange2();}} />
          </Link>
          
          <Link to='/'><img className="logo_photo" src={logo} /></Link>
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {Sidebar_bars.map((item, index) => {
              return (
                <div onClick={() => handleChange(item.path)} >
                <li key={index} className={item.cName}>
                      <Link to={item.path}>
                          {item.icon}
                          {item.title}
                      </Link> 
                </li>
                </div>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;