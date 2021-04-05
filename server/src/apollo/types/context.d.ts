import User from "../datasource/User";
import Table from "../datasource/Table";
import { PubSub } from "graphql-subscriptions";
import { ExpressContext } from "apollo-server-express";

export type TContext = {
  req: ExpressContext["req"];
  pubsub: PubSub;
  dataSources: {
    users: User;
    tables: Table;
  };
};
