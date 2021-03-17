import { ApolloError } from "apollo-server-errors";
import type { TContext } from "../types/context";
import type { QueryResolvers } from "../types/generated";

const Query: QueryResolvers<TContext> = {
  currentUser: async (_root, _args, { dataSources: { users } }) => {
    const user = await users.getCurrentUser();

    if (!user) throw new ApolloError("Something went wrong");

    return {
      email: user.email,
      fullName: user.fullName
    };
  },
  // @ts-ignore
  tables: async (_root, { limit, skip }, { dataSources: { tables } }) => {
    // @ts-ignore
    const allTables = await tables.getTables(limit, skip);

    if (!allTables) throw new ApolloError("Something went wrong");

    return {
      node: allTables,
      hasMore: false, // For now,
      cursor: allTables[length - 1]._id
    };
  }
};

export default Query;
