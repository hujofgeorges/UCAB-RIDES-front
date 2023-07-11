import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import logo from '../../../images/UCAB_RIDES.png'

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = (ban) => {
    if (ban) {   
      setSidebar(!sidebar);
    } else {
      setSidebar(true);
    }
  }
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
    <div className='navbar'>
      <NavLink to='#' className='menu-bars'>
         <FaIcons.FaBars onClick={() => showSidebar(true)} />
      </NavLink>
     <div className='mx-auto'>
          <h1 className='text-4xl text-white h1'>
             Ucab Rides
          </h1>

          {/* <img src={logo} alt="" className='logo' /> */}
     </div>
    </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={() => showSidebar(true)}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={`${item.cName} ${item.gap ? "bottom-10" : ""} font-inter `} >
                  <NavLink to={item.path} className='-mx-1'>
                    {item.icon}
                    <span>{item.title}</span>
                    {item.render}
                  </NavLink>
                </li>
             
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;

