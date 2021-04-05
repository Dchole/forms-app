import type { Resolvers } from "../types/generated";
import Mutation from "./Mutation";
import Query from "./Query";
import Subscription from "./Subscription";

const resolvers: Resolvers = {
  Query,
  Mutation,
  Subscription
};

export default resolvers;
