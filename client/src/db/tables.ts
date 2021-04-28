import { initialState, IValues } from "../components/CreateTableForm/Reducer";
import Db from "./init";

class Table extends Db {
  private collection = this.database.collection("tables");
  private data = {};

  constructor() {
    super();
    this.data = { ...initialState, rows: [], admin: "" };
  }

  public get tables() {
    return this.collection.get();
  }

  async createTable(values: IValues) {
    return this.collection.add({ ...this.data, ...values });
  }
}

export default Table;
