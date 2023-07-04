import React, { useEffect, useState, useRef } from "react";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { Contacts } from "./Contacts";
import NavbarChat from "./NavbarChat";
// import './Container.css';
import styled from "styled-components";
import Welcome from "./Welcome";
import { ChatContainer } from "./ChatContainer";
import {io} from "socket.io-client";

export const Chat = ({user, rol, orden}) => {
  const socket = useRef();
  const [currentUser, setCurrentUser] = useState();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [toggleChat, setToggleChat] = useState(false);
  const [input, setInput] = useState("");

  
  useEffect(() => {
    if (rol === "conductor" && user !== undefined) {
      axios.post('https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/obtener_pasajeros', { route_id: orden}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      }).then((contacts) => {
      setContacts(contacts.data);             // --->  Aqui se obtienen los datos de los contactos del conductor en este caso, esto deberia de agarrarlos cuando hay una cola en curso y tener ya la lista de los pasajeros
    })}
    else if (rol === "pasajero" && user !== undefined) {
      axios.post('https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/obtener_conductor', { route_id: orden}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      }).then((contacts) => {
      setContacts(contacts.data);             // --->  Aqui se obtienen los datos de los contactos del conductor en este caso, esto deberia de agarrarlos cuando hay una cola en curso y tener ya la lista de los pasajeros
    })}
  },[]);


    useEffect(() => {
      setCurrentUser(JSON.parse(user));            // ---> Este es el usuario  
      // console.log(JSON.parse(obj));
    }, []);

    useEffect(() => {
      if(currentUser){
        socket.current = io("https://api-ucabrides-v2-7913fcd58355.herokuapp.com/");
        socket.current.emit('add-user', currentUser._id);
      }
    }, [currentUser]);

    const handleChatChange = (chat) => {
      setCurrentChat(chat);
      setToggleChat(true);
    };
                                              // La idea de esta parte es que cuando haya una cola en curso los contactos para la parte del conductor sean los pasajeros, y todos los pasajeros individualmente tengan su contacto con el conductor.
  return (
    <> 
        <Container>

           <div className="container glass">

          {
            currentChat === undefined ?
            <Welcome currentUser={currentUser}/> :
            <ChatContainer currentChatt={currentChat} currentUser={currentUser} input={input} setInput={setInput} socket={socket}/>
            
          }
          </div>  
        </Container>
          <NavbarChat contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} toggleChat={toggleChat} setInput={setInput}/>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
  }

  .glass{
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border-radius: 20px;
      border:1px solid rgba(255, 255, 255, 0.18);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    }
`;
