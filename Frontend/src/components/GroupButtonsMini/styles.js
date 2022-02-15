import styled from 'styled-components';

export const Container = styled.button`
  display: flex;
  justify-content: space-between;
  width: 50px;
  margin-right: 10px;
  margin-top: 4px;  
  border: none;
  background: none;  
  cursor: default;
  
  .divButton {
    :hover {
      border-radius: 5px;
      width: 23px;
      height: 23px;
      padding-left: 2px;
      padding-top: 1px;
    }
  }
`;