import styled from 'styled-components';
import { theme } from "../../styles/tokens";

export const Container = styled.input`
  border: ${props => "2px solid "+theme.default.primary};
  border-radius: 5px;
  font-size: 20px;
  padding: 5px;  
  width: 300px;  
`;

