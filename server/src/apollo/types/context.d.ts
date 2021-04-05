import User from "../datasource/User";
import Table from "../datasource/Table";
import { PubSub } from "graphql-subscriptions";

export type TContext = {
  userID: string;
  pubsub: PubSub;
  dataSources: {
    users: User;
    tables: Table;
  };
};
