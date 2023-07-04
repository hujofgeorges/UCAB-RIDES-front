import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";

export const ChatInput = ({handleSendMsg, input, setInput}) => {
  const [msg, setMsg] = useState("");

  const sendChat = (event) => {
    event.preventDefault();
    if (input.length > 0) {
      handleSendMsg(input);
      setInput("");
    }
  };

  return (
    <Container>
      <div className="button-container">

      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text" readOnly
          placeholder="type your message here"
          // onChange={(e) => setMsg(e.target.value)} 
          value={input} 
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}


const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: transparent;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding: 1rem;
      font-size: 1.2rem;
      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 0.4rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;















// const Container = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 5% 95%;
//   background-color: #080420;
//   padding: 0 2rem;
//   @media screen and (min-width: 720px) and (max-width: 1080px) {
//     padding: 0 1rem;
//     gap: 1rem;
//   }
//   .button-container {
//     display: flex;
//     align-items: center;
//     color: white;
//     gap: 1rem;
//     .emoji {
//       position: relative;
//       svg {
//         font-size: 1.5rem;
//         color: #ffff00c8;
//         cursor: pointer;
//       }
//   .input-container {
//     width: 100%;
//     border-radius: 2rem;
//     display: flex;
//     align-items: center;
//     gap: 2rem;
//     background-color: #ffffff34;
//     input {
//       width: 90%;
//       height: 60%;
//       background-color: transparent;
//       color: white;
//       border: none;
//       padding-left: 1rem;
//       font-size: 1.2rem;
//       &::selection {
//         background-color: #9a86f3;
//       }
//       &:focus {
//         outline: none;
//       }
//     }
//     button {
//       padding: 0.3rem 2rem;
//       border-radius: 2rem;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       background-color: #9a86f3;
//       border: none;
//       @media screen and (min-width: 720px) and (max-width: 1080px) {
//         padding: 0.3rem 1rem;
//         svg {
//           font-size: 1rem;
//         }
//       }
//       svg {
//         font-size: 2rem;
//         color: white;
//       }
//     }
//   }
// `;
