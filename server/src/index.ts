import { config } from "dotenv";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server";
import { connect } from "mongoose";
import resolvers from "./apollo/resolvers";
import Table from "./apollo/datasource/Table";
import User from "./apollo/datasource/User";
import TableModel from "./models/Table";
import UserModel from "./models/User";
import currentUser from "./utils/currentUser";

config();

const schema = loadSchemaSync("src/apollo/schema.gql", {
  loaders: [new GraphQLFileLoader()]
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers
});

connect(
  process.env.NODE_ENV === "development"
    ? process.env.MONGODB_LOCAL!
    : process.env.MONGODB_URI!,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
)
  .then(() => console.log("Connected to DB!"))
  .catch((err: Error) => console.log(err));

const server = new ApolloServer({
  schema: schemaWithResolvers,
  dataSources: () => ({
    users: new User(UserModel),
    tables: new Table(TableModel)
  }),
  context: ({ req }) => {
    const token = req.headers.authorization?.split(" ")[1] || "";

    const userID = currentUser(token);

    return { userID };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
