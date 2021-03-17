import { MongoDataSource } from "apollo-datasource-mongodb";
import { IUserSchema } from "../../models/User";

interface IContext {
  userID: string;
}

class User extends MongoDataSource<IUserSchema, IContext> {
  async getCurrentUser() {
    const { userID } = this.context;
    return this.findOneById(userID);
  }

  async getUser(email: string) {
    return await this.model.findOne({ email });
  }

  async getUserForValidation(email: string) {
    return await this.model.findOne({ email }).select("password");
  }

  async createUser(details: Record<string, string>) {
    const { firstName, lastName, email, password } = details;

    return await this.model.create({
      fullName: `${firstName} ${lastName}`,
      email,
      password
    });
  }
}

export default User;
