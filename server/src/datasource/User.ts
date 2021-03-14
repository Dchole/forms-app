import { MongoDataSource } from "apollo-datasource-mongodb";
import { IUserSchema } from "../models/User";

class User extends MongoDataSource<IUserSchema> {
  async getUser(email: string) {
    return await this.model.findOne({ email });
  }
}

export default User;
