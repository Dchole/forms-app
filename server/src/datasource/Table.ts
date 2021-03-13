import { MongoDataSource } from "apollo-datasource-mongodb";
import { ITableSchema } from "../models/Table";

export default class Tables extends MongoDataSource<ITableSchema> {
  getUser(userId: string) {
    return this.findOneById(userId);
  }
}
