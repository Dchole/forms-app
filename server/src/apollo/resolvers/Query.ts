import { ApolloError } from "apollo-server-errors";
import type { TContext } from "../types/context";
import type { QueryResolvers } from "../types/generated";

const Query: QueryResolvers<TContext> = {
  currentUser: async (_root, _args, { dataSources: { users } }) => {
    const user = await users.getCurrentUser();

    if (!user) throw new ApolloError("Something went wrong");

    return {
      _id: user._id,
      email: user.email,
      fullName: user.fullName
    };
  },
  table: async (_, { id }, { dataSources: { tables } }) => {
    return tables.getTable(id);
  },
  drafts: async (
    _root,
    { limit, page },
    { dataSources: { tables, users } }
  ) => {
    const userID = users.getUserID();

    const fetchedTables = await tables.getTables(
      userID,
      limit as number | undefined,
      page as number | undefined,
      true
    );

    const hasMore = await tables.hasMore(userID, fetchedTables);

    if (!fetchedTables) throw new ApolloError("Something went wrong");

    return {
      node: fetchedTables,
      hasMore
    };
  },
  tables: async (
    _root,
    { limit, page },
    { dataSources: { tables, users } }
  ) => {
    const userID = users.getUserID();

    const fetchedTables = await tables.getTables(
      userID,
      limit as number | undefined,
      page as number | undefined
    );

    const hasMore = await tables.hasMore(userID, fetchedTables);

    if (!fetchedTables) throw new ApolloError("Something went wrong");

    return {
      node: fetchedTables,
      hasMore
    };
  }
};

export default Query;
