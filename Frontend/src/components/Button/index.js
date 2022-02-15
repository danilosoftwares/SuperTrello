import React from 'react';
import { Container } from './styles';

export default function Button({children, onClick, disabled}) {
  return (<Container disabled={disabled} onClick={disabled ? null : onClick}><p>{children}</p></Container>)
}