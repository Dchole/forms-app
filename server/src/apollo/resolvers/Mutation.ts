import { UserInputError } from "apollo-server-errors";
import { TContext } from "../types/context";
import { MutationResolvers } from "../types/generated";

const Mutation: MutationResolvers<TContext> = {
  login: async (
    _root,
    { args: { email, password } },
    { dataSources: { users } }
  ) => {
    const user = await users.getUser(email);

    if (!user)
      throw new UserInputError("Email does not exist", { key: "email" });

    console.log(user);

    return { accessToken: "" };
  },
  register: async () => ""
};

export default Mutation;
