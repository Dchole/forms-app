import { MongoDataSource } from "apollo-datasource-mongodb";
import { ITableSchema } from "../../models/Table";

class Table extends MongoDataSource<ITableSchema> {
  getTable(id: string) {
    return this.findOneById(id);
  }
}

export default Table;
