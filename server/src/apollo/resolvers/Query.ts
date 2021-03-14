import { TContext } from "../types/context";
import { QueryResolvers } from "../types/generated";

const Query: QueryResolvers<TContext> = {
  // @ts-ignore
  user: async (_root, { id }, { dataSources: { users } }) => {
    return await users.findOneById(id);
  },
  //   @ts-ignore
  tables: async (_root, { limit, skip }, { dataSources: { tables } }) => {
    return tables.findManyByIds([""]);
  }
};

export default Query;
