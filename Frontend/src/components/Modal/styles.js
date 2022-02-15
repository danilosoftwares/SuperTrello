import styled from 'styled-components';
import { theme } from "../../styles/tokens";

export const Cortain = styled.div`
  position: absolute;
  background-color: ${props => theme.default.cortain};
  opacity: 0.8;
  width: 100%;
  height: 100%;
  top: 0px;
`;

export const Box = styled.div`
  position: absolute;
  width: 50%;
  height: 50%;
  left: 25%;
  top: 25%;
  border: ${props => "2px solid "+theme.default.primary};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  background-color: ${props => theme.default.primary};
  color: white;
  height: 10%;
  width: 100%;
  flex-grow: 1;
  display: flex;
  align-items: center;

  h2 {
      font-weight: 500;
      font-size: 16px;
      padding: 0 10px;
    }
`;

export const Center = styled.div`
  background-color:white;
  height: 10%;
  width: 100%;
  flex-grow: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;  
`;

export const Footer = styled.div`
  background-color:${props => theme.default.tertiary};
  height: 10%;
  width: 100%;
  flex-grow: 1;
  border-radius: 0px 0px 5px 5px;  
  display: flex;
  justify-content: end;
  align-items: center;

  > div {
    width: 200px;
    display: flex;

    > button {
      margin-right: 10px;
    }
  }
`;
