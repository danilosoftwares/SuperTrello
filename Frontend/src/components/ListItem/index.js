import React, { useContext } from 'react';
import { MdAdd } from 'react-icons/md';
import Button from '../Button';
import CardItem from '../CardItem';
import PositionContext from '../../context';
import { Container, ContainerAdd } from './styles';
import GroupButtonsMini from '../GroupButtonsMini';

export default function ListItem({ data, index: listIndex, toAdd }) {
  const { ShowQuestion } = useContext(PositionContext);

  return (
    toAdd ?
    <ContainerAdd >
      <Button onClick={(e) => ShowQuestion({open:true,text:"Digite o Nome da Nova Coluna:",type:"column-new"})}><MdAdd size={20} color="#FFF"/>Nova Coluna</Button>
    </ContainerAdd>
    : 
    <Container done={data.done}>
      <header>
        <h2>{data.description}</h2>
        <GroupButtonsMini black={true}
          click={(value) => ShowQuestion({open:true,text:value === "delete" ? "Confirma a Exclusão desta Coluna ?" : "Digite o Novo Nome da Coluna", type:"column-"+value, params:{column:listIndex}})}
        ></GroupButtonsMini>
      </header>

      <ul>
        { data.cards.map((card, index) => (
          card && card.id ? 
          <CardItem 
            toAdd={false}
            key={card.id} 
            listIndex={listIndex}
            index={index} 
            data={card}
          /> : null
        ))}
        
        <CardItem 
            toAdd={true}
            key={-1} 
            listIndex={listIndex}
            index={data.cards.length + 1} 
            data={{}}
          />
      </ul>
    </Container>
  );
}
