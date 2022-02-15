import styled from 'styled-components';
import { theme } from "../../styles/tokens";

export const Container = styled.div`
  width: 300px;
  height: 40px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: ${props => "2px solid "+theme.default.primary};
`;

export const ColorItem = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${props => props.color};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
