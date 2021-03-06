import React, { useState } from 'react';
import Input from '../Input';
import Modal from '../Modal';
import Palette from '../Palette';
import { theme } from "../../styles/tokens";
import { ContainerStart, ContainerImage } from './style';
import addColumn from "../../images/column_add.png";
import editColumn from "../../images/column_edit.png";
import deleteColumn from "../../images/column_delete.png";
import addCard from "../../images/card_add.png";
import newCard from "../../images/card_new.png";
import editCard from "../../images/card_edit.png";
import deleteCard from "../../images/card_delete.png";
import moveCard from "../../images/card_move.png";
import deleteMenu from "../../images/menu_delete.png";
import shareMenu from "../../images/menu_share.png";
import infoMenu from "../../images/menu_info.png";
import showMenu from "../../images/menu_show.png";

export default function GroupModal({visible, type, text, defaultInput, result}) {
  const [screenInfo, setScreenInfo] = useState(0)
  const [inputModal, setInputModal] = useState("");
  const [cardColor, setCardColor] = useState(theme.cards.color.red);  

  const toResult = (value) => {
    type === "card-new" || type === "card-edit" ? result(value,{params:{value:inputModal,color:cardColor}}) : result(value,{params:{value:inputModal}});
    setInputModal("");
    setCardColor(theme.cards.color.red);
  }

  const toResultInfo = (value) => {
    if (screenInfo < 13) {
      value ? setScreenInfo(screenInfo + 1) : setScreenInfo(screenInfo - 1);
    } else {      
      result(value,{params:{}});
      setScreenInfo(0);
    }
  }

  return (
    visible &&
    <>
      {
        type === "column-new" || type === "column-edit" ?
          <Modal buttons={{ok:{disabled:inputModal.length === 0},cancel:{}}}  visible={visible} result={toResult} >
            <h3>{text}</h3>
            <Input onChange={(e) => setInputModal(e.target.value)} type="text"></Input>
          </Modal> 
        : type === "card-new" || type === "card-edit" ?
          <Modal buttons={{ok:{disabled:inputModal.length === 0},cancel:{}}} visible={visible} result={toResult} >
            <h3>{text}</h3><Input onChange={(e) => setInputModal(e.target.value)} type="text"></Input>
            <h3>{"Selecione uma Cor para o Cart??o"}</h3><Palette default={theme.cards.color.red} selected={setCardColor}></Palette>
          </Modal> 
          : type === "board-share" ?
          <Modal visible={visible} result={(value) => result(value,{params:{value:inputModal}})} >
            <h3>{text}</h3><Input value={defaultInput.value} type="text"></Input>
          </Modal> 
          : type === "board-delete" ?
          <Modal buttons={{ok:{disabled:inputModal.length === 0},cancel:{}}}  visible={visible} result={toResult} >
            <h3>{text}</h3><Input onChange={(e) => setInputModal(e.target.value)} type="text"></Input>
            <h3>{defaultInput.valid}</h3>
          </Modal>    
          : type === "board-start" ?
          <Modal buttons={{ok:{disabled:inputModal.length === 0},cancel:{disabled:true}}} visible={visible} result={toResult} >          
            <ContainerStart>
            <h3>{text}</h3>
            <h3>{defaultInput.continue}</h3>
            </ContainerStart>            
            <Input onChange={(e) => setInputModal(e.target.value)} type="text"></Input>                        
          </Modal>  
          : type === "board-info" ?
          <Modal 
            steps={true} 
            visible={visible} 
            buttons={{prior:{disabled:screenInfo === 0}}}
            result={toResultInfo} 
            >
          { 
            screenInfo === 0 ?
              <>
              <h3>{"Ol??"}</h3>
              <h3>{"Vamos fazer juntos um tour para conhecer a ferramenta de ToDo ?"}</h3>
              </>    
            : screenInfo === 1 ?
            <><ContainerImage src={addColumn} alt="nenhuma"></ContainerImage><h3>{"Ao clicar no bot??o adicionar coluna voc?? poder?? inserir novas colunas"}</h3></> 
            : screenInfo === 2 ?
            <><ContainerImage src={editColumn} alt="nenhuma"></ContainerImage><h3>{"Com uma coluna criada voc?? tem a possibilidade de editar"}</h3></> 
            : screenInfo === 3 ?
            <><ContainerImage src={deleteColumn} alt="nenhuma"></ContainerImage><h3>{"Tem a possibilidade de excluir"}</h3></> 
            : screenInfo === 4 ?
            <><ContainerImage src={addCard} alt="nenhuma"></ContainerImage><h3>{"Com uma coluna criada voc?? tamb??m tem a possibilidade de adicionar um cart??o"}</h3></> 
            : screenInfo === 5 ?
            <><ContainerImage src={newCard} alt="nenhuma"></ContainerImage><h3>{"Na tela de gera????o de cart??es voc?? ter?? a possibilidade de dar o nome ao cart??o alem de escolher uma cor para o mesmo"}</h3></>             
            : screenInfo === 6 ?
            <><ContainerImage src={editCard} alt="nenhuma"></ContainerImage><h3>{"Com um cart??o criado voc?? ter?? a possibilidade de editar"}</h3></>             
            : screenInfo === 7 ?
            <><ContainerImage src={deleteCard} alt="nenhuma"></ContainerImage><h3>{"E a possibilidade de excluir tambem"}</h3></>      
            : screenInfo === 8 ?
            <><ContainerImage src={moveCard} alt="nenhuma"></ContainerImage><h3>{"E tambem a possibilidade de mover, segurando e arrastando com o mouse"}</h3></> 
            : screenInfo === 9 ?
            <><ContainerImage src={showMenu} alt="nenhuma"></ContainerImage><h3>{"Alem dos seus cart??es e colunas, voc?? tem tambem um menu com diversas op????es"}</h3></>               
            : screenInfo === 10 ?
            <><ContainerImage src={infoMenu} alt="nenhuma"></ContainerImage><h3>{"A primeira que voc?? ir?? encontrar de cima para baixo ?? a de informa????es do 'ToDo'"}</h3></>               
            : screenInfo === 11 ?
            <><ContainerImage src={shareMenu} alt="nenhuma"></ContainerImage><h3>{"Seguindo a diante ser?? exibido o bot??o de compartilhar que ir?? permitir compartilhar o ToDo"}</h3></>               
            : screenInfo === 12 ?
            <><ContainerImage src={deleteMenu} alt="nenhuma"></ContainerImage><h3>{"Por ??ltimo ?? exibido o bot??o de excluir um ToDo"}</h3></> 
            : screenInfo === 13 ?
            <>
            <h3>{"Com todos esses passos voc?? j?? consegue utilizar de forma correta o ToDo"}</h3>
            <h3>{"Fa??a um bom uso e divirta-se!!!"}</h3>
            </>                  
            : null 
          }
        </Modal>          
        : 
        <Modal visible={visible} result={(value) => result(value,{params:{value:inputModal}})} >
        <h3>{text}</h3>
        </Modal> 
      }
    </>     
  );
}
