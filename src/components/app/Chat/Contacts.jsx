import React, { useState, useEffect } from "react";
import styled from "styled-components";



export const Contacts = ({contacts, currentUser, changeChat, rol}) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  


  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.name.split(" ")[0]);
      setCurrentUserImage(currentUser.avatar);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  }


  return (
  <>
    {currentUserImage && currentUserName && (
      <Container>
        <div className="brand">

         {
            rol === "conductor"
                   ?
             <h3>Pasajeros</h3>
                    :
             <h3>Conductor</h3>
         }
  
        </div>
        <div className="contacts">
          {contacts.map((contact, index) => {
            return (
              <div
                key={contact._id}
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                onClick={() => {
                  changeCurrentChat(index, contact);
                }}
              >
                <div className="avatar">
                  <img
                    src={contact.avatar}
                    alt=""
                  />
                </div>
                <div className="username">
                  <h3>{contact.name.split(" ")[0]}</h3>
                </div>
              </div>
            );
          })}
        </div>
        <div className="current-user">
          <div className="avatar">
            <img
              src={currentUser.avatar || `${process.env.PUBLIC_URL}/avatar.png`}
              alt="avatar"
            />
          </div>
          <div className="username">
            <h2>{currentUserName}</h2>
          </div>
        </div>
      </Container>
    )}
  </>
);
}


 

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #e5e5e5;
  height: 90vh;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: black;
      font-family: 'inter', sans-serif;
      font-size: 2rem;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #fff0f3;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      box-shadow: 0 0 2rem 0.5rem #00000029;
      align-items: center;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: black;
          font-family: 'inter', sans-serif;
          font-size: 1.5rem;
        }
      }
    }
    .selected {
      background-color: #2BB94F;
    }
  }
  .current-user {
    background-color: #37b4e3;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
        border-radius: 50%;
      }
    }
    .username {
      h2 {
        color: black;
        font-family: 'inter', sans-serif;
        font-size: 1.5rem;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;