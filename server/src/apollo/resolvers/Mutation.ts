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
    _,
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
    _,
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
  updateUser: async (_, { args }, { dataSources: { users } }) => {
    return users.updateUser(args);
  },
  createTable: async (_, { args }, { dataSources: { tables }, userID }) => {
    return tables.createTable({ ...args, admin: userID });
  },
  deleteTable: async (_, { id }, { dataSources: { tables } }) => {
    const deleted = await tables.deleteTable(id);

    return Boolean(deleted);
  },
  addRow: async (_, { args }, { pubsub, dataSources: { tables } }) => {
    const newRow = await tables.addRow(args);
    pubsub.publish("ROW_ADDED", { newRow });

    return newRow;
  },
  editRow: async (_, { args }, { pubsub, dataSources: { tables } }) => {
    const editedRow = await tables.editRow(args);
    pubsub.publish("ROW_EDITED", { editedRow });

    return editedRow;
  },
  deleteRow: async (_, { args }, { pubsub, dataSources: { tables } }) => {
    const deletedRow = tables.deleteRow(args);
    pubsub.publish("ROW_DELETED", { deletedRow });

    return deletedRow;
  },
  toggleDisableTable: async (
    _,
    { id },
    { pubsub, dataSources: { tables } }
  ) => {
    const disabled = await tables.toggleDisableTable(id);
    pubsub.publish("TOGGLE", { disabled });

    return disabled;
  }
};

export default Mutation;
