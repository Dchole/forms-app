import { MongoDataSource } from "apollo-datasource-mongodb";
import { IUserSchema } from "../../models/User";
import type { Maybe } from "../types/generated";

interface IContext {
  userID: string;
}

interface IUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

class User extends MongoDataSource<IUserSchema, IContext> {
  async getCurrentUser() {
    const { userID } = this.context;
    return this.findOneById(userID);
  }

  async getUser(email: string) {
    return this.model.findOne({ email }).select("-password");
  }

  async getUserForValidation(email: string) {
    return this.model.findOne({ email }).select("password");
  }

  async createUser(details: IUserInput) {
    const { firstName, lastName, email, password } = details;

    return this.model.create({
      fullName: `${firstName} ${lastName}`,
      email,
      password
    });
  }

  async updateUser(details: Record<string, Maybe<string>>) {
    const update: Record<string, string> = {};

    Object.entries(details).map(([key, value]) => {
      if (value) {
        update[key] = value;
      }
    });

    const updatedUser = await this.model
      .findOneAndUpdate(
        {
          _id: this.context.userID
        },
        update,
        { new: true }
      )
      .select("-password");

    if (!updatedUser) throw new Error("Something went wrong");

    return updatedUser;
  }
}

export default User;
