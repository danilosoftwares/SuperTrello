import React from 'react';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import { Container } from './styles';
import { theme } from "../../styles/tokens";

export default function GroupButtonsMini({black, click}) {
  return (
    <Container black={black}>
      <div className='divButton'>
        <MdModeEdit size={20} color={black ? theme.default.emphasis : "#FFF"} onClick={(e) => click("edit")} />
      </div>
      <div className='divButton'>
        <MdDelete size={20} color={black ? theme.default.emphasis : "#FFF"} onClick={(e) => click("delete")} />
      </div>
  </Container>
    )
}