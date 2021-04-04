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
  tables: async (_root, { limit, skip }, { dataSources: { tables } }) => {
    const allTables = await tables.getTables(
      limit as number | undefined,
      skip as number | undefined
    );

    if (!allTables) throw new ApolloError("Something went wrong");

    return {
      node: allTables,
      hasMore: false, // For now,
      cursor: allTables[allTables.length - 1]._id // For now
    };
  }
};

export default Query;
