import React, { useState } from 'react';
import { Container, ColorItem } from './styles';
import { MdCheck } from 'react-icons/md';
import { theme } from "../../styles/tokens";

export default function Palette(props) {
  const list = [theme.cards.color.red,theme.cards.color.blue,theme.cards.color.green,theme.cards.color.purple,theme.cards.color.orange];
  const [selected, setSelected] = useState(list.indexOf(props.default));

  const select = (index, color) => {
    setSelected(index);
    props.selected(color);
  }

  return (
    <Container>
      { list.map((item, index) => {
          return <ColorItem onClick={() => select(index, item)} key={index} color={item}>{selected === index ? <MdCheck size={20} color={"white"}></MdCheck> : null}</ColorItem>
      })}

    </Container>
  )
}