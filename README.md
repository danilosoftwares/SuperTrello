# Super Trello
## _Projeto simplificado que procura criar um ToDo bem Semelhante ao Trello_

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

O projeto é dividido em duas partes backend e frontend

## Utilizando
![](demonstracao.gif)

## Backend

Essencialmente o backend tem como objetivo gerar um banco de dados baseado numa modelagem já definida e tambem gerar endpoints para acesso dos dados, fazendo a interação do front com o banco de dados.

Compilação

```sh
cd backend
npm i
npm start
```

 Tecnologias utilizadas:
- [NodeJS](https://nodejs.dev/) 
- [Sequelize](https://sequelize.org/) 
- [SQLite3](https://www.sqlite.org/index.html) 

Porta interna utilizada 4000

| Tipo | URL | O que faz |
| ------ | ------ | ------ |
| GET | / | Traz a página do própriamente dita do frontend, porém inicialmente para pré cadastro |
| GET | /:id | Traz a página do própriamente dita do frontend, porém com o ID do ToDo para edição |
| GET | /board/:id | Traz um objeto estruturado completo do ToDo, formado por board, coluna e cartões |
| DELETE | /board/:id | Deleta do banco de dados o ToDo informado por um ID |
| POST | /board | Cria um ToDo exigindo uma chave |
| POST | /columns | Cria uma coluna no ToDo |
| PUT | /columns/:id | Altera a coluna localizando a mesma por um ID |
| DELETE | /columns/:id | Deleta a coluna localizando a mesma por um ID |
| POST | /columns/:id/cards | Cria um card referenciando o mesmo a uma coluna |
| PUT | /columns/:column/cards/:card | Altera um cartão localizando o mesmo pelo seu ID e sua referencia de coluna |
| DELETE | /columns/:column/cards/:card | Deleta um cartão localizando o mesmo pelo seu ID e sua referencia de coluna |
| PUT | /remake | Recria um ToDo completo com base no payload do objeto repassado |

## Frontend

Essencialmente o frontend tem como objetivo permitir ao usuario final ter de forma visual e fácil a interação com os cards e colunas do ToDo, tambem efetua a interação dos dados informados na tela com o banco de dados repassando os mesmos ao backend.

Compilação

```sh
cd frontend
npm i
npm start
```

 Tecnologias utilizadas:
- [ReactJS](https://pt-br.reactjs.org/) 
- [Axios](https://axios-http.com/docs/intro) 
- [Styled-Components](https://styled-components.com/) 
- [react-dnd](https://react-dnd.github.io/react-dnd/about)

## License

MIT
