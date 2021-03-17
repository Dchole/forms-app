import { compare, genSalt, hash } from "bcryptjs";
import { UserInputError } from "apollo-server-errors";
import { TContext } from "../types/context";
import { MutationResolvers } from "../types/generated";
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
  }
};

export default Mutation;
