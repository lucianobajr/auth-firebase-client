import { darken } from "polished";
import styled, { css } from "styled-components";

import Tooltip from "../Tooltip";

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  width: 100%;
  border: 2px solid #c8e7ff;
  color: #666360;
  ${(props) =>
    props.isErrored &&
    css`
      border-color: rgba(178,105,250,1);
    `}
  ${(props) =>
    props.isFocused &&
    css`
      border-color: ${darken(0.2, "#c8e7ff")};
      color: ${darken(0.2, "#c8e7ff")};
    `}
    ${(props) =>
    props.isFilled &&
    css`
      color: ${darken(0.2, "#c8e7ff")};
    `}
  display: flex;
  align-items: center;
  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #666360;
    &::placeholder {
      color: #666360;
    }
  }
  & + div {
    margin-top: 8px;
  }
  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: rgba(178,105,250,1);
    color: #fff;
    &::before {
      border-color: rgba(178,105,250,1) transparent;
    }
  }
`;
