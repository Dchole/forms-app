import { config } from "dotenv";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServer, PubSub } from "apollo-server";
import { connect } from "mongoose";
import resolvers from "./apollo/resolvers";
import Table from "./apollo/datasource/Table";
import User from "./apollo/datasource/User";
import TableModel from "./models/Table";
import UserModel from "./models/User";
import { startDatabase } from "./lib/database";

config();

export const schema = loadSchemaSync("src/apollo/schema.gql", {
  loaders: [new GraphQLFileLoader()]
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers
});

startDatabase();

const pubsub = new PubSub();

const server = new ApolloServer({
  schema: schemaWithResolvers,
  dataSources: () => ({
    users: new User(UserModel),
    tables: new Table(TableModel)
  }),
  context: ({ req }) => ({ req, pubsub })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

export default server;
