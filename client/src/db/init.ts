import Zango from "zangodb";
import { initialState } from "../components/CreateTableForm/Reducer";

const db = new Zango.Db("forms", 1, { tables: Object.keys(initialState) });

export default db;
