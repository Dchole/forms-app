import type { TContext } from "../types/context";
import type { MutationResolvers } from "../types/generated";
import { compare, genSalt, hash } from "bcryptjs";
import { UserInputError } from "apollo-server-errors";
import {
  createAccessToken,
  createRefreshToken
} from "../../utils/createTokens";

const Mutation: MutationResolvers<TContext> = {
  login: async (
    _root,
    { args: { email, password } },
    { dataSources: { users } }
  ) => {
    const user = await users.getUserForValidation(email);

    if (!user) {
      throw new UserInputError("Email does not exist", { key: "email" });
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new UserInputError("Password Incorrect!", { key: "password" });
    }

    const accessToken = createAccessToken(user._id);
    const refreshToken = createRefreshToken(user._id);

    return { accessToken, refreshToken };
  },
  register: async (
    _root,
    { args: { email, password, ...name } },
    { dataSources: { users } }
  ) => {
    const user = await users.getUserForValidation(email);

    if (user) {
      throw new UserInputError("Email already taken", { key: "email" });
    }

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    return users.createUser({
      email,
      password: hashedPassword,
      ...name
    });
  },
  updateUser: async (_root, { args }, { dataSources: { users } }) => {
    return users.updateUser(args);
  },
  createTable: async (_root, { args }, { dataSources: { tables }, userID }) => {
    return tables.createTable({ ...args, admin: userID });
  },
  deleteTable: async (_root, { id }, { dataSources: { tables } }) => {
    const deleted = await tables.deleteTable(id);

    return Boolean(deleted);
  },
  addRow: async (_root, { args }, { dataSources: { tables } }) => {
    return tables.addRow(args);
  },
  editRow: async (_root, { args }, { dataSources: { tables } }) => {
    return tables.editRow(args);
  },
  deleteRow: async (_root, { args }, { dataSources: { tables } }) => {
    return tables.deleteRow(args);
  }
};

export default Mutation;
