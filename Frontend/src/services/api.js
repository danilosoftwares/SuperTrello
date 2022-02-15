import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

export default class Service {
  static postBoard = async (payload) => await api.post("/board",payload);
  static getBoard = async (id) => await api.get("/board/"+id);
  static deleteBoard = async (id, payload) => await api.delete("/board/"+id, { data: payload });
  static postColumns = async (payload) => await api.post("/columns", payload, {}); 
  static putColumns = async (obj, id) => await api.put("/columns/"+id, obj);  
  static deleteColumns = async (id) => await api.delete("/columns/"+id);
  static postCards = async (obj, column) => await api.post("/columns/"+column+"/cards", obj);
  static putCards = async (obj, column, id) => await api.put("/columns/"+column+"/cards/"+id, obj);
  static deleteCards = async (column, id) => await api.delete("/columns/"+column+"/cards/"+id); 
  static remake = async (payload) => await  api.put("/remake", payload);
}
