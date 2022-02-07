import { darken } from "polished";
import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  height: 100vh;
  width: 100%;
  aside {
    width: 55%;

    padding: 0 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }
  main {
    width: 45%;
    background: #c8e7ff;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const appearFromLeft = keyframes`
  from {
    opacity:0;
    transform:translate(0,-50px);
  }
  to { 
    opacity:1;
    transform:translate(0,0);
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  align-items: stretch;
  text-align: center;

  animation: ${appearFromLeft} 1s;

  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    h1 {
      margin-bottom: 24px;
      color: #666360;
      align-self: center;
    }
    a {
      font-weight: bold;
      text-decoration: underline;
      color: #666360;

      transition: color 1s ease-out;

      &:hover {
        color: ${darken(0.1, "#666360")};
      }
    }
  }
`;

export const CreateRoom = styled.button`
  margin-top: 8px;
  height: 50px;
  border-radius: 8px;
  font-weight: bold;
  background: linear-gradient(
    90deg,
    rgba(109, 206, 243, 1) 35%,
    rgba(178, 105, 250, 1) 100%
  );
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 0;
  width: 100%;

  margin-bottom: 24px;

  transition: background 1s ease-out;
  &:hover {
    background: linear-gradient(
      90deg,
      ${darken(0.1, "rgba(109,206,243,1)")} 35%,
      ${darken(0.1, "rgba(178,105,250,1)")} 100%
    );
  }
`;
