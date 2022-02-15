import React from 'react';
import ListItem from '../ListItem';
import { Container } from './styles';

export default function Board({lists}) {

  return (
      <Container>
        {lists.map((list, index) => <ListItem toAdd={false} key={list.description} index={index} data={list} />)}
        <ListItem toAdd={true} key={-1} />
      </Container>
  );
}
