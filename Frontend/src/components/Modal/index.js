import React from 'react';

import Button from '../Button';
import { Cortain, Box, Footer, Center, Header } from './styles';

export default function Modal({visible, children, result, steps = false, buttons = {ok:{},cancel:{},prior:{},next:{}}}) {
  return (
    visible &&
    <>
      <Cortain>
      </Cortain>
      <Box>
        <Header>
          <h2>Informação</h2>
        </Header>
        <Center>
          {children}
        </Center>
        <Footer>
        { steps ? 
         <div>
            <Button disabled={buttons.prior ? buttons.prior.disabled : false} onClick={(e) => result(false)}>
              Anterior
            </Button>
          </div> : null }
          <div>
          { steps ? 
            <Button disabled={buttons.next ? buttons.next.disabled : false} onClick={(e) => result(true)}>
              Avançar
            </Button> :
            <>
            <Button disabled={buttons.ok ? buttons.ok.disabled : false} onClick={(e) => result(true)}>
              OK
            </Button>
            <Button disabled={buttons.cancel ? buttons.cancel.disabled : false} onClick={(e) => result(false)}>
              Cancelar
            </Button>
            </>
          }
          </div>
        </Footer>
      </Box>
    </>     
  );
}
