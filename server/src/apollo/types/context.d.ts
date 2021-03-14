import User from "../../datasource/User";
import Table from "../../datasource/Table";

export type TContext = {
  dataSources: {
    users: User;
    tables: Table;
  };
};
