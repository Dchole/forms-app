import { IValues } from "../components/CreateTableForm/Reducer";
import db from "./init";

const tables = db.collection("tables");

export const getAllTables = async () => {
  return tables.find({});
};

export const insertNewTable = async (values: IValues) => {
  return tables.insert(values).then(() => tables.find({}));
};
