import React from 'react';
import { Container } from './styles';

export default function Input(props) {
  return (<Container  
    type="text"
    value={props.value}
    onChange={props.onChange}
  ></Container>)
}