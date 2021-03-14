import { Resolvers } from "../types/generated";
import Mutation from "./Mutation";
import Query from "./Query";

const resolvers: Resolvers = {
  Query,
  Mutation
};

export default resolvers;
