import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server";
import resolvers from "./apollo/resolvers";
import Tables from "./datasource/Table";
import Users from "./datasource/Users";
import TableModel from "./models/Table";
import UserModel from "./models/User";

const schema = loadSchemaSync("src/apollo/schema.gql", {
  loaders: [new GraphQLFileLoader()]
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers
});

const server = new ApolloServer({
  schema: schemaWithResolvers,
  dataSources: () => ({
    users: new Users(UserModel),
    tables: new Tables(TableModel)
  })
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
