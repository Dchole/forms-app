import User from "../datasource/User";
import Table from "../datasource/Table";

export type TContext = {
  userID;
  dataSources: {
    users: User;
    tables: Table;
  };
};
