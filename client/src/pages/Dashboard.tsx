import { useEffect, useState } from "react";
import { client } from "..";
import {
  Draft,
  GetDraftsDocument as query,
  GetDraftsQuery
} from "../apollo/generated/graphql";
import Layout from "../components/Layout";

const Dashboard = () => {
  const [drafts, setDrafts] = useState<Draft[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await client.query<GetDraftsQuery>({
        query
      });
      setDrafts(data.drafts);
    })();
  }, []);

  return <Layout></Layout>;
};

export default Dashboard;
