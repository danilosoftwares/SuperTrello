import styled from 'styled-components';
import { theme } from "../../styles/tokens";

export const Container = styled.div`
  background-color: ${props => theme.default.secondary};
  border-radius: 5px;
  margin: 5px;
`;

export const Buttons = styled.div`
  height: 50px;
  width: calc(100% - 10px);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin: 5px;
  cursor:pointer;

  :hover {
    border: ${props => "2px solid "+theme.default.background};
  }
`;