import styled, { css } from 'styled-components';
import { theme } from "../../styles/tokens";

export const ContainerItem = styled.div`
  position: relative;
  background: #FFF;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 15px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  cursor: grab; 

  .divHeader {
    background-color: ${props => props.labels && props.labels.length > 0 ? props.labels : theme.default.secondary};
    height: 30px;
    position: relative;
    top: -15px;
    left: -15px;
    width: 112%;   
    border-radius: 5px 5px 0px 0px; 
    display: flex;
    justify-content: end;
  }

  p {
    font-weight: 500;
    line-height: 20px;
  }

  img {
    width: 24px;
    height: 24px;
    border-radius: 2px;
    margin-top: 5px;
  }

  ${props => props.isDragging && css`
    border: 2px dashed rgba(0, 0, 0, 0.2);
    padding-top: 31px;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    cursor: grabbing;

    p, img, header {
      opacity: 0;
    }
  `}
`;

export const ContainerAdd = styled.div`
`;