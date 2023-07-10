import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, NavLink } from 'react-router-dom';
import './NavbarChat.css';
import chatox from '../../../images/conversation.png'
import { Contacts } from './Contacts';
import { PredetMsgs } from './PredetMsgs';
import  contactos  from '../../../images/group.png'
import  logochat  from '../../../images/Chat Rides.png'


function NavbarChat({contacts, currentUser, changeChat, toggleChat, setInput, rol}) {

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

    // if (ban) {
    //   setSidebar(true)
    //   setLeftBar(false)
    // }

  
      setSidebar(!sidebar)
      setLeftBar(false)
    

  };
  const showLeftbar = (ban) => {

    if (ban) {
    setLeftBar(!leftbar)
    setSidebar(false)
    }

    if (!ban) {
      setLeftBar(true)
      setSidebar(false)
      }
  };

  return (
    <>
    <div className='navbarchat'>
      {/* <NavLink to='#' className='menu-bars'>
         <FaIcons.FaBars onClick={showSidebar} />
      </NavLink> */}

      <img src={contactos} onClick={showSidebar} className='menu-bars' />
     <div className='mx-auto'>


     <img src={logochat} className='logo' />
        
     </div>

    { toggleChat && ( 
      <div>
        <img src={chatox} className='chat-button' onClick={showLeftbar} />
      </div>
    )} 
     
    </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <div className='nav-menu-items' onClick={showSidebar} >
            <li className='navbar-toggle-chat'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <hr />
             <Contacts contacts={contacts} currentUser={currentUser} changeChat={changeChat} rol={rol} />
          </div>
        </nav>


        
        <nav className={!leftbar ? 'nav-menu-right active' : 'nav-menu-right'}>
          <div className='nav-menu-items'>
            <li className='navbar-toggle-chat' onClick={() => showLeftbar(true)}>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
              <PredetMsgs setInput={setInput} rol={rol}/>
          </div>
        </nav>
    </>
  );
}

export default NavbarChat;
