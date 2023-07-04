import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import './NavbarChat.css';
import chatox from '../../../images/conversation.png'
import { Contacts } from './Contacts';
import { PredetMsgs } from './PredetMsgs';


function NavbarChat({contacts, currentUser, changeChat, toggleChat, setInput}) {

  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.name.split(" ")[0]);
      setCurrentUserImage(currentUser.avatar);
    }
  }, [currentUser]);


  const [sidebar, setSidebar] = useState(false);
  const [leftbar, setLeftBar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar)
    setLeftBar(false)
  };
  const showLeftbar = () => {
    setLeftBar(!leftbar)
    setSidebar(false)
  };

  return (
    <>
    <div className='navbar'>
      <NavLink to='#' className='menu-bars'>
         <FaIcons.FaBars onClick={showSidebar} />
      </NavLink>
     <div className='mx-auto'>
          <h1 className=' text-white'>
            Chat Rides
          </h1>
     </div>

    { toggleChat && ( 
      <div>
        <img src={chatox} className='chat-button' onClick={showLeftbar} />
      </div>
    )} 
     
    </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <div className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <Contacts contacts={contacts} currentUser={currentUser} changeChat={changeChat}/>
          </div>
        </nav>

        
        <nav className={!leftbar ? 'nav-menu-right active' : 'nav-menu-right'}>
          <div className='nav-menu-items' onClick={showLeftbar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
              <PredetMsgs setInput={setInput}/>
          </div>
        </nav>
    </>
  );
}

export default NavbarChat;
