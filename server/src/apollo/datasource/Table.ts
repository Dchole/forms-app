import { MongoDataSource } from "apollo-datasource-mongodb";
import type { TableInput } from "../types/generated";
import type { ITableSchema } from "../../models/Table";

class Table extends MongoDataSource<ITableSchema> {
  async getTable(id: string) {
    return this.findOneById(id);
  }

  async getTables(limit: number = 10, skip: number = 0) {
    return this.model.find().limit(limit).skip(skip);
  }

  async createTable(props: TableInput & { admin: string }) {
    return this.model.create(props);
  }

  async deleteTable(id: string) {
    return this.model.deleteOne({ _id: id });
  }
}

export default Table;
