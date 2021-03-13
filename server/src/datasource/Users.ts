import { MongoDataSource } from "apollo-datasource-mongodb";
import { IUserSchema } from "../models/User";

export default class Users extends MongoDataSource<IUserSchema> {
  getUser(userId: string) {
    return this.findOneById(userId);
  }
}
