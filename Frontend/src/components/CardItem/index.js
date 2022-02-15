import React, { useRef, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { MdAdd } from 'react-icons/md';

import PositionContext from '../../context';
import Button from '../Button';
import GroupButtonsMini from '../GroupButtonsMini';

import { ContainerItem, ContainerAdd } from './styles';

export default function CardItem({ data, index, listIndex, toAdd }) {
  const ref = useRef();
  const { move, ShowQuestion } = useContext(PositionContext);  

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD' , index, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
        return;
      }

      const targetSize = ref.current.getBoundingClientRect();
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    }
  })

  toAdd ? dropRef(ref) : dragRef(dropRef(ref));

  return (
    toAdd ?
    <ContainerAdd ref={ref} labels={data.color} isFantom={data.id === undefined}>
      <Button onClick={(e) => ShowQuestion({open:true,text:"Digite o Nome do Novo Cartão:", type:"card-new", params:{column:listIndex}})}><MdAdd size={20} color="#FFF"/> Adicionar Novo Cartão</Button> 
    </ContainerAdd>
    :    
    <ContainerItem ref={ref} isDragging={isDragging} labels={data.color} isFantom={data.id === undefined}>
      <div className='divHeader'>
        <GroupButtonsMini click={(value) => ShowQuestion({open:true,text:value === "delete" ? "Confirma a Exclusão deste Cartão?" : "Digite o Novo Nome do Cartão", type:"card-"+value, params:{id:data.id,column:listIndex}})}></GroupButtonsMini>
      </div>
      <p>{data.description}</p>
    </ContainerItem> 
  );
}