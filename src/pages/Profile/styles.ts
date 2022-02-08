import { darken, shade } from "polished";
import styled, { css } from "styled-components";

export const Container = styled.div`
  background: #fff;
  height: 100vh;
  > header {
    height: 144px;
    background: #28262e;
    display: flex;
    align-items: center;
    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
      svg {
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -176px auto 0;
  width: 100%;

  form {
    margin: 80px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;
    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }
    > a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s ease-in-out;
      &:hover {
        color: ${shade(0.2, "#F4EDE8")};
      }
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  width: 186px;
  align-self: center;
  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }
  label {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #c8e7ff;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;
    input {
      display: none;
    }
    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }
    &:hover {
      background: ${shade(0.2, "#c8e7ff")};
    }
  }
`;

interface ButtonProps {
  dontTouch: boolean;
}

export const Button = styled.button<ButtonProps>`
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
  cursor: ${({ dontTouch }) => (dontTouch ? "not-allowed" : "pointer")};
  border: 0;
  width: 100%;
  margin-bottom: 24px;

  transition: background 1s ease-out;
  ${({ dontTouch }) =>
    dontTouch === false &&
    css`
      &:hover {
        background: linear-gradient(
          90deg,
          ${darken(0.1, "rgba(109,206,243,1)")} 35%,
          ${darken(0.1, "rgba(178,105,250,1)")} 100%
        );
      }
    `}
`;
