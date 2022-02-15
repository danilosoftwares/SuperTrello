const express = require("express");
const path = require("path");
const cors = require('cors');
const bodyParser = require("body-parser");
const sequelize = require("../config/database");
const Board = require("../database/models/board");
const Columns = require("../database/models/columns");
const Cards = require("../database/models/cards");

sequelize.sync().then(()=> { console.log("database created") });

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));
app.use(express.static("public/static"));
app.use(express.static("public/static/assets"));
app.use(express.static("public/static/assets/img"));
app.use(express.static("public/static/assets/img/avatars"));
app.use(express.static("public/static/css"));
app.use(express.static("public/static/js"));
app.use(express.static("public/static/media"));

const getWebSite = (res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
}

app.get("/", async (req, res)=>{
  getWebSite(res);
});

app.get("/:id", async (req, res)=>{
  try{
    const { id } = req.params;
    if (id){
      const retBoard = await Board.findByPk(id);
      if (retBoard && retBoard.dataValues && retBoard.dataValues.id){
        getWebSite(res);
      } else {
        res.redirect('/');
      }
    }
  } catch (e) {
    res.status(400).send({status:false, result: e.message})
  }
});

app.get("/board/:id", async (req, res)=>{
  try{
    const { id } = req.params;
    if (id){
      let result = {id:0,columns:[]};
      const retBoard = await Board.findByPk(id);
      if (retBoard && retBoard.dataValues){
        result.id = retBoard.dataValues.id;
        const retColumns = await Columns.findAll({ where: { idBoard: retBoard.dataValues.id } });  
        for (const key in retColumns) {    
          result.columns.push({id:retColumns[key].dataValues.id, description:retColumns[key].dataValues.description, cards:[]});
          const retCards = await Cards.findAll({ where: { idColumn: retColumns[key].dataValues.id } , order: [['position', 'ASC'],] },);
          for (const keyCards in retCards) {
            result.columns[result.columns.length-1].cards.push({
              id:retCards[keyCards].dataValues.id, 
              description:retCards[keyCards].dataValues.description, 
              color:retCards[keyCards].dataValues.color,
              position:retCards[keyCards].dataValues.position,
            });
          }
        }
        res.send({status:true, result:result});
      } else {
        res.send({status:false, result:{}});
      }
    } else {
      res.send({status:false, result:{}});
    } 
  } catch (e) {
    res.status(400).send({status:false, result: e.message})
  }
});

app.delete("/board/:id",async (req, res)=>{  
  try{
    const { id } = req.params;
    const { password } = req.body;
    const ret = await Board.destroy({ where: {id:id, password:password}});
    res.send({status:true, result:ret});
  } catch (e) {
    res.status(400).send({status:false, result:e.message})
  }
});

app.post("/board", async (req, res) => {
  try{    
    let { password } = req.body;
    const ret = await Board.create({password:password});  
    res.send({status:true, result:ret.dataValues});
  } catch (e) {
    res.status(400).send({status:false, result: e.message})
  }    
});

app.post("/columns",async (req, res)=>{  
  try{  
    let { idBoard, description, password } = req.body;
    if (!idBoard){
      const ret = await Board.create({password:password});
      idBoard = ret.dataValues.id;
    }
    const ret = await Columns.create({idBoard:idBoard,description:description});

    res.send({status:true, result:ret.dataValues});
  } catch (e) {
    res.status(400).send({status:false, result: e.message})
  }  
});

app.put("/columns/:id",async (req, res)=>{  
  try{
    const { id } = req.params;   
    const { description } = req.body;     
    const ret = await Columns.update({description:description}, { where: { id:id}},);
    res.send({status:true, result:ret});
  } catch (e) {
    res.status(400).send({status:false, result:e.message})
  }
});

app.delete("/columns/:id",async (req, res)=>{  
  try{
    const { id } = req.params;
    const ret = await Columns.destroy({ where: {id:id}});
    res.send({status:true, result:ret});
  } catch (e) {
    res.status(400).send({status:false, result: e.message})
  }
});

app.post("/columns/:id/cards",async (req, res)=>{  
  try{
    const { id } = req.params;
    const { description, color } = req.body;    
    let retDefault = await Cards.max("position",{where : {idColumn:id}});
    retDefault = retDefault !== null ? retDefault + 1 : 1;
    const ret = await Cards.create({idColumn:id,description:description,color:color,position:retDefault});
    res.send({status:true, result:ret.dataValues});
  } catch (e) {
    res.status(400).send({status:false, result: e.message})
  }
});

app.put("/columns/:column/cards/:card",async (req, res)=>{  
  try{
    const { column, card } = req.params;
    const ret = await Cards.update(req.body, { where: { idColumn:column, id:card}},);
    res.send({status:true, result:ret});
  } catch (e) {
    res.status(400).send({status:false, result: e.message})
  }
});

app.delete("/columns/:column/cards/:card",async (req, res)=>{  
  try{
    const { column, card } = req.params;
    const ret = await Cards.destroy({ where: {id:card,idColumn:column}});
    res.send({status:true, result:ret});
  } catch (e) {
    res.status(400).send({status:false, result: e.message})
  }
});

app.put("/remake",(req, res) => {
  try {    
    const obj = req.body;
    if (obj && obj.columns)
    {                
      for (const key in obj.columns) {
        Cards.destroy({where : { idColumn: obj.columns[key].id }});  
        Columns.destroy({where : { id: obj.columns[key].id }});
      }
      for (const key in obj.columns) {      
        Columns.create({ id: obj.columns[key].id, idBoard: obj.id, description:obj.columns[key].description });
        for (const kc in obj.columns[key].cards) {
          if (obj.columns[key].cards[kc]){
            Cards.create({ 
                                  id: obj.columns[key].cards[kc].id, 
                                  idColumn: obj.columns[key].id, 
                                  description:obj.columns[key].cards[kc].description, 
                                  color:obj.columns[key].cards[kc].color, 
                                  position: (parseInt(kc)+1),
                                });
          }
        }
      }
      res.send({status:true, result:"success"});
    } else {
      res.status(400).send({status:false, result: "object invalid"})
    }
  } catch (e) {
    res.status(400).send({status:false, result: e.message})
  }    
});

app.listen(4000,()=> {
  console.log("server active on port 4000");
})