import { styled } from "styled-components";
import {msjpasajeroUcab, msjconductorUcab, msjconductorCasa, msjpasajeroCasa} from "./mensajesData.js"
import { useState } from "react";
import {v4 as uuidv4} from 'uuid';

export const PredetMsgs = ({setInput, rol}) => {
  const [currentSelected, setCurrentSelected] = useState(undefined);

  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");

  const handleOpcionSeleccionada = (opcion) => {
    setOpcionSeleccionada(opcion);
  };

  return (
   <>
  <div style={{ borderBottom: '1px solid black', width: '100%' }}></div>
   <Container>
        <div className="brand">
          <h3> Mensajes </h3>
        </div>
        
        <div className="contacts">

        <div className={"button-51"} onClick={() => handleOpcionSeleccionada("opcion1")} > 
                  <div className="username mx-auto">
                     <h3> Destino: Ucab </h3>
                  </div>
        </div>

        <div className={"button-52"} onClick={() => handleOpcionSeleccionada("opcion2")} >  
                  <div className="username mx-auto">
                     <h3> Destino: Casa </h3>
                  </div>
        </div>
        
        <div style={{ borderBottom: '1px solid black', width: '100%' }}></div>

      
        {
          rol === "pasajero" && opcionSeleccionada === "opcion1" && (
            msjpasajeroUcab.map((msj, index) => {
              return (
                <div
                  key={uuidv4()}
                  className={`boton-verde ${index === currentSelected ? "selected" : ""}`}
                  onClick={() => setInput(msj)}
                >
                  <div className="username">
                    <h3>{msj}</h3>
                  </div>
                </div>
              );
            })
          )
      }

      {
          rol === "pasajero" && opcionSeleccionada === "opcion2" && (
            msjpasajeroCasa.map((msj, index) => {
              return (
                <div
                  key={uuidv4()}
                  className={`boton-azul ${index === currentSelected ? "selected" : ""}`}
                  onClick={() => setInput(msj)}
                >
                  <div className="username">
                    <h3>{msj}</h3>
                  </div>
                </div>
              );
            })
          )
      }

      {
          rol === "conductor" && opcionSeleccionada === "opcion1" && (
            msjconductorUcab.map((msj, index) => {
              return (
                <div
                  key={uuidv4()}
                  className={`boton-verde ${index === currentSelected ? "selected" : ""}`}
                  onClick={() => setInput(msj)}
                >
                  <div className="username">
                    <h3>{msj}</h3>
                  </div>
                </div>
              );
            })
          )
      }


        {
          rol === "conductor" && opcionSeleccionada === "opcion2" && (
            msjconductorCasa.map((msj, index) => {
              return (
                <div
                  key={uuidv4()}
                  className={`boton-azul ${index === currentSelected ? "selected" : ""}`}
                  onClick={() => setInput(msj)}
                >
                  <div className="username">
                    <h3>{msj}</h3>
                  </div>
                </div>
              );
            })
          )
        }

        </div>
   </Container>
   
   </>
  )
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
    font-size: 1.5rem;
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
      background-color: #ffffff34;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
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
        }
      }
    }

    .boton-verde {
      background-color: #2BB94F;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
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
        }
      }
    }

    .boton-azul {
      background-color: #37b4e3;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
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
        }
      }
    }


    .button-51 {
      background-color: #2BB94F;
      border: 1px solid #266DB6;
      box-sizing: border-box;
      color: #00132C;
      font-family: "Avenir Next LT W01 Bold",sans-serif;
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      padding: 16px 23px;
      position: relative;
      text-decoration: none;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: black;
          font-family: 'inter', sans-serif;
        }
      }
    }

    .button-52 {
      background-color: #37b4e3;
      border: 1px solid #266DB6;
      box-sizing: border-box;
      color: #00132C;
      font-family: "Avenir Next LT W01 Bold",sans-serif;
      font-size: 16px;
      font-weight: 700;
      line-height: 24px;
      padding: 16px 23px;
      position: relative;
      text-decoration: none;
      user-select: none;
      -webkit-user-select: none;
      touch-action: manipulation;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: black;
          font-family: 'inter', sans-serif;
        }
      }
    }


    .selected {
      background-color: #9a86f3;
    }
  }
  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
        font-family: 'inter', sans-serif;
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
  {/* {
    rol === "pasajero" ? (
  
  
  
      msjpasajeroUcab.map((msj, index) => {
        return (
          <div
            key={uuidv4()}
            className={`contact ${index === currentSelected ? "selected" : ""}`}
            onClick={() => setInput(msj)}
          >
            <div className="username">
              <h3>{msj}</h3>
            </div>
          </div>
        );
      })
    ) : (
      msjconductorUcab.map((msj, index) => {
        return (
          <div
            key={uuidv4()}
            className={`contact ${index === currentSelected ? "selected" : ""}`}
            onClick={() => setInput(msj)}
          >
            <div className="username">
              <h3>{msj}</h3>
            </div>
          </div>
        );
      })
    )
  } */}



