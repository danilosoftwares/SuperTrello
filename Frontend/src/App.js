import React, { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import GlobalStyle from './styles/global';
import Menu from './components/Menu';
import Board from './components/Board';
import { Container } from "./styles"

import PositionContext from './context';
import produce from 'immer';
import service from "./services/api";
import GroupModal from './components/GroupModal';


function App() {
  const [lists, setLists] = useState([]);
  const [idBoard, setIdBoard] = useState("");
  const [showModal, setShowModal] = useState({open:false,text:'',type:'',params:{}});

  const getList = async (idBoard) => {
    if (idBoard){
      const dtnew = await service.getBoard(idBoard);
      setLists(dtnew.data.result.columns);
    }
  }

  const start = () => {
    const id = window.location.pathname.replace("/","");
    if (id){
      setIdBoard(id);
      if (sessionStorage.getItem("started") === "1"){
        clickMenu("info");
      }
    } else {
      setShowModal({open:true,text:'Seja Bem Vindo!',type:'board-start',params:{
        continue:'Vamos iniciar a criação de um novo Board com uma palavra chave que será autorização para uma exclusão futura, caso seja necessário.'
      }});
    }
  }

  const ShowQuestion = (object) => {
    setShowModal(object);
  }

  const clickMenu = (value) => {
    if (value === "share"){
      setShowModal({open:true,text:'Copie o url Abaixo para Compartilhar',type:'board-share',params:{value:window.location.href}});
    } else if (value === "delete"){
      setShowModal({open:true,text:'Informe a Senha para Exclusão deste To-Do',type:'board-delete',params:{valid:''}});
    } else if (value === "info"){
      setShowModal({open:true,text:'Este projeto tem por objetivo criar um ToDo',type:'board-info',params:{}});      
    }
  }

  const ResultShow = async (value, params) => {
    if (value){
      let ret = undefined;
      if (showModal.type === "column-new"){
        ret = await service.postColumns({idBoard:idBoard, description:params.params.value});     
      } else if (showModal.type === "column-edit"){
        const idColumn = lists[showModal.params.column].id;
        ret = await service.putColumns({description:params.params.value},idColumn);     
      } else if (showModal.type === "column-delete"){
        const idColumn = lists[showModal.params.column].id;
        ret = await service.deleteColumns(idColumn);   
      } else if (showModal.type === "card-new"){
        const idColumn = lists[showModal.params.column].id;
        ret = await service.postCards({description:params.params.value, color:params.params.color},idColumn);   
      } else if (showModal.type === "card-delete"){
        const idColumn = lists[showModal.params.column].id;
        const idCard = showModal.params.id;
        ret = await service.deleteCards(idColumn,idCard);   
      } else if (showModal.type === "card-edit"){
        const idColumn = lists[showModal.params.column].id;
        const idCard = showModal.params.id;
        ret = await service.putCards({description:params.params.value, color:params.params.color},idColumn,idCard);   
      } else if (showModal.type === "board-start") {
        ret = await service.postBoard({password:params.params.value});    
        sessionStorage.setItem("started","1");
        window.location.href = window.location.origin+"/"+ret.data.result.id;
      } else if (showModal.type === "board-info") {        
        sessionStorage.removeItem("started");
      } else if (showModal.type === "board-delete"){
        try{
          ret = await service.deleteBoard(idBoard, {password:params.params.value}); 
          if (ret.data.result === 0) {
            setShowModal({open:true,text:'Informe a Senha para Exclusão deste To-Do',type:'board-delete',params:{valid:'Senha Inválida!'}});
            return;
          }     
          window.location.href = window.location.origin;     
        } catch (e) {
          console.log(e);
        }      
      }
      if (ret){
        getList(idBoard);
        if (ret.data.status === false){
          console.log(ret.data);
        }
      }
    }
    setShowModal({open:false,text:'',type:'',params:{}});
  }

  const move = async (fromList, toList, from, to) => {
    setLists(produce(lists, draft => {      
      const dragged = draft[fromList].cards[from];
      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.splice(to, 0, dragged);
    }))
  }

  useEffect(() => {
    start();
  },['']);

  useEffect(() => {
    if (idBoard && lists && lists.length > 0){
      service.remake({id:idBoard,columns:lists}).catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
    }
  }, [lists,idBoard]);

  useEffect(() => {
    getList(idBoard);
  }, [idBoard]);

  return (
    <DndProvider backend={HTML5Backend}>
      <Container>
        <PositionContext.Provider value={{ lists, move, ShowQuestion }}>
          <Menu click={clickMenu}/>
          <Board lists={lists} /> 
          <GroupModal visible={showModal.open} type={showModal.type} text={showModal.text} defaultInput={showModal.params} result={ResultShow} />
        </PositionContext.Provider>     
      </Container>
      <GlobalStyle />
    </DndProvider>
  );
}

export default App;
