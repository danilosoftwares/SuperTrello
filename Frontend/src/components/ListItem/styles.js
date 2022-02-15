import styled from 'styled-components';
import { theme } from "../../styles/tokens";

export const Container = styled.div`
  padding: 0 15px;
  height: 100%;
  flex: 0 0 320px;

  & + div {
    border-left: 1px solid rgba(0, 0, 0, 0.05);
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 42px;  

    h2 {
      font-weight: 500;
      font-size: 16px;
      padding: 0 10px;
    }
  }

  ul {
    margin-top: 30px;
  }
`;


export const ContainerAdd = styled.div`
  padding: 0 15px;
  height: 100%;
  flex: 0 0 320px;

  div {
    position: relative;    
    background: ${props => theme.default.primary};    
    color: white;
    border-radius: 5px;
    margin-bottom: 10px;
    padding: 15px;
    box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
    cursor: pointer; 

    p {
      font-weight: 500;
      line-height: 20px;
      display: flex;
      svg {
        margin-right: 10px;
      }
    }
  }
`;
