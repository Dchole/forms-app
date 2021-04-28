import { IValues } from "../components/CreateTableForm/Reducer";
import Db from "./init";

class Table extends Db {
  private collection = this.database.collection("tables");

  public get tables() {
    return this.collection.get();
  }

  async createTable(values: IValues) {
    return this.collection.add(values);
  }
}

export default Table;
