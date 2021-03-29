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

    const res = await users.createUser({
      email,
      password: hashedPassword,
      ...name
    });

    return {
      fullName: res.fullName,
      email: res.email
    };
  },
  updateUser: async (_root, { args }, { dataSources: { users } }) => {
    const user = await users.updateUser(args);

    if (!user) throw new Error("Something went wrong!");

    return {
      email: user.email,
      fullName: user.fullName
    };
  },
  createTable: async (_root, { args }, { dataSources: { tables }, userID }) => {
    const newTable = await tables.createTable({ ...args, admin: userID });

    if (!newTable) throw new Error("Something went wrong!");

    const {
      _id,
      title,
      fields,
      rows,
      disabled,
      deadline,
      limit,
      admin
    } = newTable;

    return {
      _id,
      title,
      fields,
      rows,
      disabled,
      deadline,
      limit,
      admin
    };
  }
};

export default Mutation;
