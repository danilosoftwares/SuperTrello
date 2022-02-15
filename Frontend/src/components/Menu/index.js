import React from 'react';
import { Buttons, Container } from './styles';
import { MdInfoOutline, MdShare, MdDelete } from 'react-icons/md';

export default function Menu({click}) {
  return (
  <Container>
    <Buttons>
    <MdInfoOutline size={36} color="#FFF" onClick={(e) => click("info")}/>
    </Buttons>
    <Buttons>
    <MdShare size={36} color="#FFF" onClick={(e) => click("share")}/>
    </Buttons>
    <Buttons>
    <MdDelete size={36} color="#FFF" onClick={(e) => click("delete")}/>
    </Buttons>
  </Container>
  )
}