import { MongoDataSource } from "apollo-datasource-mongodb";
import { ITableSchema } from "../../models/Table";

class Table extends MongoDataSource<ITableSchema> {
  async getTable(id: string) {
    return this.findOneById(id);
  }

  async getTables(limit: number = 10, skip: number = 0) {
    return this.model.find().limit(limit).skip(skip);
  }
}

export default Table;
