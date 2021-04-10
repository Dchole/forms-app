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
  tables: async (
    _root,
    { limit, page, filter },
    { dataSources: { tables, users } }
  ) => {
    const userID = users.getUserID();
    const countTables = tables.countTables(userID);

    const fetchedTables = tables.getTables(
      userID,
      limit as number | undefined,
      page as number | undefined,
      filter
    );

    const [totalCount, allTables] = await Promise.all([
      countTables,
      fetchedTables
    ]);

    if (!allTables) throw new ApolloError("Something went wrong");

    return {
      node: allTables,
      hasMore: Boolean(totalCount - allTables.length)
    };
  }
};

export default Query;
