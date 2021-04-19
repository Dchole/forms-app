import { MongoDataSource } from "apollo-datasource-mongodb";
import { genSalt, hash } from "bcryptjs";
import { IUserSchema } from "../../models/User";
import currentUser from "../../utils/currentUser";
import type { TContext } from "../types/context";
import type { Maybe } from "../types/generated";

interface IUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

class User extends MongoDataSource<IUserSchema, TContext> {
  getUserID() {
    const { req } = this.context;
    return currentUser(req);
  }

  async getCurrentUser() {
    const userID = this.getUserID();
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

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    return this.model.create({
      fullName: `${firstName} ${lastName}`,
      email,
      password: hashedPassword
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
          _id: this.getUserID()
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
