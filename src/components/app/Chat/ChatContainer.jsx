import styled from 'styled-components';
import { ChatInput } from './ChatInput';
import { useEffect, useRef, useState } from 'react';
import axios from '../../../api/axios';
import {v4 as uuidv4} from 'uuid';



export const ChatContainer = ({currentChatt, currentUser, input, setInput, socket, rol}) => {  
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();

  const handleSendMsg = async (msg) => {
    await axios.post('https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/addmessages', {
      from: currentUser._id,
      to: currentChatt._id,
      message: msg,
    })

    socket.current.emit('send-msg', {
      to: currentChatt._id,
      from: currentUser._id,
      message: msg,
    });
  
    const msgs = [...messages];
    msgs.push({fromSelf: true, message: msg});
    setMessages(msgs);
  };

  useEffect(() => {
    if(socket.current){
      socket.current.on('receive-msg', (msg) => {
        setArrivalMessage({fromSelf: false, message: msg});
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => { 
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://api-ucabrides-v2-7913fcd58355.herokuapp.com/api/getmessages', {
          from: currentUser._id,
          to: currentChatt._id,
        });
        setMessages(response.data);
      } catch (error) {
        // Manejo del error aquí
        console.error('Error al obtener los mensajes:', error);
      }
    };
    fetchData();
  }, [currentChatt]);

    return (
     <>
       { currentChatt && (

     
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={currentChatt.avatar || `${process.env.PUBLIC_URL}/avatar.png`}
                  alt=""
                />
              </div>
              <div className="username">
                <h3>{currentChatt.name.split(" ")[0]}</h3>
              </div>
              
            </div>

          </div>
          <div className="chat-messages">
            {              
              messages.map((message) => {
                return (
                <div ref={scrollRef} key={uuidv4()} > 

                  {rol === "conductor" ? 
                    <div className={`message ${message.fromSelf ? "sendedConductor" : "recievedConductor"}`}> 
                      <div className="content">
                        <p>
                            {message.message}
                        </p>
                      </div>
                    </div>
                    : 
                    <div className={`message ${message.fromSelf ? "sendedPasajero" : "recievedPasajero"}`}> 
                      <div className="content">
                        <p>
                            {message.message}
                        </p>
                      </div>
                    </div>
                  }

                </div>
               )
              })
            }

            
          </div>
             <ChatInput handleSendMsg={handleSendMsg} input={input} setInput={setInput} /> 
        </Container>
       )}   
    </>
      );
}


const Container = styled.div`
 
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
          border-radius: 50%;
        }
      }
      .username {
        h3 {
          color: black;
          font-family: 'inter', sans-serif;
          font-size: 1.6rem;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    font-family: 'inter', sans-serif;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 70%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: black;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sendedConductor {
      justify-content: flex-end;
      .content {
        background-color: #2BB94F;
      }
    }
    .recievedConductor {
      justify-content: flex-start;
      .content {
        // background-color: #c0c0c0;
        background-color: #37b4e3;
      }
    }
    .sendedPasajero {
      justify-content: flex-end;
      .content {
        background-color: #37b4e3;
      }
    }
    .recievedPasajero {
      justify-content: flex-start;
      .content {
        // background-color: #c0c0c0;
        background-color: #2BB94F;
      }
    }
    
  }
`;